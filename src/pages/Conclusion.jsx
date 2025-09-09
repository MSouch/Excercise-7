import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'
import { FaLinkedin, FaFacebook, FaXTwitter, FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import APLSLogo from '../assets/AP-Networks-LearningSytems-Full-DivOf (6).png'

// Minimal placeholder AP Learning Systems logo data URL (1x1 px transparent PNG)
const LOGO_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YyZk0QAAAAASUVORK5CYII='

const { FiAward, FiDownload, FiShare2, FiHome, FiTarget, FiTrendingUp } = FiIcons

const Conclusion = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const navigate = useNavigate()
  const [certificateUrl, setCertificateUrl] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [generationError, setGenerationError] = useState(null)

  const calculateScoreLevel = () => {
    const { completedChallenges, totalChallenges } = progress
    if (completedChallenges === totalChallenges) return 'Expert'
    if (completedChallenges >= 3) return 'Proficient'
    if (completedChallenges >= 2) return 'Developing'
    return 'Needs Training'
  }

  const generateCertificate = async () => {
    console.log('Starting certificate generation...')
    setGenerating(true)
    setGenerationError(null)
    
    try {
      // Dynamic import jsPDF to avoid build issues
  const { jsPDF } = await import('jspdf')
      console.log('jsPDF imported successfully')
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      console.log('PDF dimensions:', { pageWidth, pageHeight })

      // Background
      pdf.setFillColor(248, 250, 252)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // Main Border only (removed inner decorative border)
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(2)
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)

      // Logo (top-left): Prefer imported local asset; fall back to embedded data URL
      try {
        const img = new Image()
        img.src = APLSLogo
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })
        pdf.addImage(img, 'PNG', 14, 12, 30, 12)
      } catch (e1) {
        try {
          const img2 = new Image()
          img2.src = LOGO_DATA_URL
          await new Promise((resolve, reject) => {
            img2.onload = resolve
            img2.onerror = reject
          })
          pdf.addImage(img2, 'PNG', 14, 12, 30, 12)
        } catch (e2) {
          console.warn('Logo failed to load, continuing without it.')
        }
      }

      // Header
      pdf.setFontSize(32)
      pdf.setTextColor(59, 130, 246)
      pdf.setFont('helvetica', 'bold')
      const headerText = 'CERTIFICATE OF COMPLETION'
      pdf.text(headerText, pageWidth / 2, 35, { align: 'center' })

      // Subtitle
      pdf.setFontSize(18)
      pdf.setTextColor(75, 85, 99)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Quality Planning Navigator Training Simulation', pageWidth / 2, 50, { align: 'center' })

      // Achievement text
      pdf.setFontSize(16)
      pdf.setTextColor(17, 24, 39)
      pdf.text('This certifies that', pageWidth / 2, 75, { align: 'center' })

      // User name
      const userName = user?.full_name || user?.user_metadata?.full_name || user?.email || 'Participant'
      pdf.setFontSize(28)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(17, 24, 39)
      pdf.text(userName, pageWidth / 2, 95, { align: 'center' })

      // Achievement description
      pdf.setFontSize(16)
      pdf.setTextColor(75, 85, 99)
      pdf.setFont('helvetica', 'normal')
      pdf.text('has successfully completed the Quality Planning Navigator training simulation', pageWidth / 2, 115, { align: 'center' })
      pdf.text('and demonstrated mastery of quality planning fundamentals', pageWidth / 2, 130, { align: 'center' })

      // Score level
      const scoreLevel = calculateScoreLevel()
      pdf.setFontSize(22)
      pdf.setTextColor(34, 197, 94)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`Achievement Level: ${scoreLevel}`, pageWidth / 2, 150, { align: 'center' })

      // Performance metrics
      pdf.setFontSize(12)
      pdf.setTextColor(107, 114, 128)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Challenges Completed: ${progress.completedChallenges}/${progress.totalChallenges}`, pageWidth / 2, 165, { align: 'center' })
      pdf.text(`Overall Score: ${progress.overallScore}%`, pageWidth / 2, 175, { align: 'center' })

      // Date
      pdf.setFontSize(14)
      pdf.setTextColor(107, 114, 128)
      pdf.setFont('helvetica', 'normal')
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`Completed on ${date}`, pageWidth / 2, 190, { align: 'center' })

      // Company info
      pdf.setFontSize(18)
      pdf.setTextColor(59, 130, 246)
      pdf.setFont('helvetica', 'bold')
      pdf.text('AP-Learning Systems', pageWidth / 2, 210, { align: 'center' })

      // Division text
      pdf.setFontSize(12)
      pdf.setTextColor(107, 114, 128)
      pdf.setFont('helvetica', 'normal')
      pdf.text('A Division of AP-Networks LLC', pageWidth / 2, 220, { align: 'center' })

      // Completion Code
      pdf.setFontSize(10)
      pdf.setTextColor(107, 114, 128)
      pdf.text('Completion Code: QPN0400', 20, pageHeight - 25)

      // Certificate verification info
      const userEmail = user?.email || user?.user_metadata?.email || ''
      if (userEmail) {
        pdf.setFontSize(8)
        pdf.setTextColor(107, 114, 128)
        pdf.text(`Issued to: ${userEmail}`, pageWidth - 20, pageHeight - 35, { align: 'right' })
      }

      // Copyright
      pdf.setFontSize(8)
      pdf.setTextColor(107, 114, 128)
      pdf.text('© 2025 AP-Learning Systems, a Division of AP-Networks LLC - ALL RIGHTS RESERVED', pageWidth / 2, pageHeight - 15, { align: 'center' })

      console.log('PDF content generated successfully')

      // Create blob and URL
  const pdfBlob = pdf.output('blob')
      const url = URL.createObjectURL(pdfBlob)
      console.log('Certificate blob created:', { size: pdfBlob.size, type: pdfBlob.type })

      setCertificateUrl(url)
      setCertificateGenerated(true)

      // Save certificate info to localStorage (without certificate_id)
      const certificateData = {
        user_id: user?.id || 'unknown',
        user_email: userEmail,
        user_name: userName,
        certificate_code: 'QPN0400',
        score_level: scoreLevel,
        total_score: progress.overallScore,
        challenges_completed: progress.completedChallenges,
        issued_at: new Date().toISOString(),
        generated: true
      }

  // Store metadata and blob URL for quick re-access
  localStorage.setItem('qualityPlanningNavigatorCertificate', JSON.stringify({ ...certificateData, blob_url: url }))
      console.log('Certificate data saved to localStorage')

    } catch (error) {
      console.error('Error generating certificate:', error)
      setGenerationError('Failed to generate certificate. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const downloadCertificate = () => {
    if (certificateUrl) {
      try {
        const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
        const fileName = `Quality-Planning-Navigator-Certificate-${userName.replace(/\s+/g, '-')}.pdf`
        
        const link = document.createElement('a')
        link.href = certificateUrl
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        console.log('Certificate download initiated:', fileName)
      } catch (error) {
        console.error('Error downloading certificate:', error)
        alert('There was an error downloading your certificate. Please try again.')
      }
    } else {
      console.log('No certificate URL available, regenerating...')
      generateCertificate()
    }
  }

  // Check if user completed all challenges
  const allChallengesCompleted = progress.completedChallenges === progress.totalChallenges

  // Check for existing certificate in localStorage
  useEffect(() => {
    const existingCertificate = localStorage.getItem('qualityPlanningNavigatorCertificate')
    if (existingCertificate && allChallengesCompleted) {
      try {
        const certData = JSON.parse(existingCertificate)
        if (certData.user_id === user?.id && certData.generated) {
          console.log('Certificate was previously generated')
          setCertificateGenerated(true)
        }
      } catch (error) {
        console.error('Error loading existing certificate:', error)
      }
    }
  }, [user?.id, allChallengesCompleted])

  // Auto-generate certificate when component mounts if conditions are met
  useEffect(() => {
    console.log('Conclusion useEffect - Checking certificate generation conditions')
    console.log('All challenges completed:', allChallengesCompleted)
    console.log('Certificate generated:', certificateGenerated)
    console.log('Currently generating:', generating)
    console.log('User exists:', !!user)

    if (allChallengesCompleted && !certificateGenerated && !generating && user) {
      console.log('All conditions met - generating certificate...')
      setTimeout(() => {
        generateCertificate()
      }, 1000) // Increased delay to ensure component is fully mounted
    }
  }, [allChallengesCompleted, certificateGenerated, generating, user])

  const performanceImpacts = [
    {
      challenge: 'Challenge 1',
      impact: 'Implemented systematic quality integration to reduce rework costs by 60-80% through prevention-focused planning approaches'
    },
    {
      challenge: 'Challenge 2', 
      impact: 'Mastered QA/QC balance that reduces total quality costs by 45% while improving outcomes through risk-based resource allocation'
    },
    {
      challenge: 'Challenge 3',
      impact: 'Developed comprehensive ITPs that reduce quality escapes by 70% and improve schedule adherence by 25% through systematic verification'
    },
    {
      challenge: 'Challenge 4',
      impact: 'Created quality-integrated work packages that improve compliance rates by 40% and productivity by 15% through seamless integration'
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiAward} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Outstanding Achievement - Quality Planning Navigator Expert!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You've successfully completed Quality Planning Navigator and proven your mastery of quality management fundamentals. 
              Your systematic approach demonstrates the advanced capabilities that distinguish expert maintenance planners.
            </p>
          </motion.div>

          {/* Performance Impact */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Quality Planning Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceImpacts.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <SafeIcon icon={FiTarget} className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.challenge}</h3>
                    <p className="text-gray-600 text-sm">{item.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Statistics */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Industry Impact - Your Skills Create Measurable Value
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Organizations implementing quality planning approaches like yours report:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: '60-80%', label: 'Reduction in rework costs', direction: 'down' },
                { metric: '45%', label: 'Reduction in total quality costs', direction: 'down' },
                { metric: '70%', label: 'Reduction in quality escapes', direction: 'down' },
                { metric: '40%', label: 'Improvement in compliance rates', direction: 'up' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${stat.direction === 'down' ? 'bg-success-100' : 'bg-primary-100'}`}>
                    {stat.direction === 'down' ? (
                      <FaArrowDown className="w-6 h-6 text-green-600" />
                    ) : (
                      <FaArrowUp className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <p className={`text-2xl font-bold mb-1 ${stat.direction === 'down' ? 'text-green-600' : 'text-primary-600'}`}>{stat.metric}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificate Section */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Certificate of Mastery
            </h2>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-lg p-6 text-white mb-6">
                <SafeIcon icon={FiAward} className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Certified Quality Planning Navigator Expert</h3>
                <p className="text-primary-100">
                  Achievement Level: {calculateScoreLevel()}
                </p>
                <p className="text-primary-100 text-sm">
                  Overall Score: {progress.overallScore}%
                </p>
                <p className="text-primary-100 text-sm mt-2">
                  Completion Code: QPN0400
                </p>
                {user?.email && (
                  <p className="text-primary-100 text-xs mt-2">
                    Issued to: {user.email}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {!allChallengesCompleted ? (
                  <div className="py-4">
                    <p className="text-gray-600 mb-4">Complete all 4 challenges to generate your certificate</p>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      <SafeIcon icon={FiHome} className="w-4 h-4" />
                      <span>Continue Training</span>
                    </Link>
                  </div>
                ) : generating ? (
                  <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                    <span className="text-gray-600">Generating your certificate...</span>
                  </div>
                ) : generationError ? (
                  <div className="py-4">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                      <p className="text-red-600 text-sm">{generationError}</p>
                    </div>
                    <button
                      onClick={generateCertificate}
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      <SafeIcon icon={FiAward} className="w-4 h-4" />
                      <span>Try Again</span>
                    </button>
                  </div>
                ) : certificateGenerated ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-success-600 mb-4">
                      <SafeIcon icon={FiAward} className="w-5 h-5" />
                      <span className="font-medium">Certificate Ready!</span>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                      <button
                        onClick={downloadCertificate}
                        className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Download Certificate</span>
                      </button>
                      <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                        <p className="text-sm font-medium text-gray-700 mb-3 text-center">Share your achievement:</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://example.com/')}&quote=${encodeURIComponent('I just completed the Quality Planning Navigator training simulation and earned the Quality Planning Navigator Expert certificate! [Insert Certificate Download]')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg-[#1877F2] hover:bg-[#125ec0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                            aria-label="Share on Facebook"
                          >
                            <FaFacebook className="w-4 h-4" />
                            <span>Facebook</span>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('I just completed the Quality Planning Navigator training simulation and earned the Quality Planning Navigator Expert certificate! [Insert Certificate Download]')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                            aria-label="Share on X"
                          >
                            <FaXTwitter className="w-4 h-4" />
                            <span>X</span>
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://example.com/')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg-[#0A66C2] hover:bg-[#084f94] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                            aria-label="Share on LinkedIn"
                          >
                            <FaLinkedin className="w-4 h-4" />
                            <span>LinkedIn</span>
                          </a>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={() => {
                              const shareText = `I completed the Quality Planning Navigator simulation and earned my ${calculateScoreLevel()} certificate! #Quality #Maintenance #Training [Insert Certificate Download]`
                              navigator.clipboard.writeText(shareText)
                            }}
                            className="inline-flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors shadow"
                          >
                            <span>Copy Share Text</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Certificate will be generated fresh each time you download it
                    </p>
                  </div>
                ) : allChallengesCompleted ? (
                  <div className="py-4">
                    <button
                      onClick={generateCertificate}
                      disabled={generating}
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                      <SafeIcon icon={FiAward} className="w-4 h-4" />
                      <span>Generate Certificate</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Next Steps for Continued Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Immediate Implementation:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use your completed worksheets and templates on your next planning project</li>
                  <li>• Share quality integration approaches with your planning team</li>
                  <li>• Implement risk-based QA/QC balancing in your work</li>
                  <li>• Apply systematic quality requirements integration from project initiation</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Professional Development:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Pursue advanced quality certifications (ASQ, API)</li>
                  <li>• Join industry quality communities and benchmarking groups</li>
                  <li>• Mentor other planners in quality integration techniques</li>
                  <li>• Explore other Navigator Series training modules</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiHome} className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Conclusion
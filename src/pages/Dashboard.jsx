import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import ProgressTracker from '../components/common/ProgressTracker.jsx'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiPlay, FiCheck, FiLock, FiAward, FiClock, FiRotateCcw } = FiIcons

const Dashboard = () => {
  const { user } = useAuth()
  const { progress, loading } = useProgress()
  const navigate = useNavigate()

  console.log('Dashboard: Rendering with progress:', progress)
  console.log('Dashboard: Loading state:', loading)

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    )
  }

  const challenges = [
    {
      id: 1,
      title: 'Quality System Integration',
      description: 'Apply quality management fundamentals to real planning situations from project initiation',
      path: '/challenge/1'
    },
    {
      id: 2,
      title: 'QA vs QC Balance', 
      description: 'Distinguish when to emphasize prevention versus detection approaches for optimal outcomes',
      path: '/challenge/2'
    },
    {
      id: 3,
      title: 'Verification Planning (ITPs)',
      description: 'Develop effective Inspection and Test Plans for complex work across multiple disciplines',
      path: '/challenge/3'
    },
    {
      id: 4,
      title: 'Quality Integration in Work Packages',
      description: 'Embed quality requirements seamlessly into work packages for maximum compliance and productivity',
      path: '/challenge/4'
    }
  ]

  const getChallengeStatus = (challengeId) => {
    const challengeProgress = progress.challenges[challengeId]
    const completedChallenges = progress.completedChallenges || 0

    console.log(`Dashboard: Challenge ${challengeId} status check:`)
    console.log(`  - Challenge Progress:`, challengeProgress)
    console.log(`  - Completed Challenges:`, completedChallenges)

    if (challengeProgress?.status === 'complete') {
      console.log(`  - STATUS: complete`)
      return 'complete'
    }

    if (challengeId === 1) {
      console.log(`  - STATUS: available (Challenge 1 always available)`)
      return 'available'
    }

    if (challengeId <= completedChallenges + 1) {
      console.log(`  - STATUS: available (next in sequence)`)
      return 'available'
    }

    console.log(`  - STATUS: locked`)
    return 'locked'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return FiCheck
      case 'available': return FiPlay
      case 'locked': return FiLock
      default: return FiLock
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'text-success-600 bg-success-100'
      case 'available': return 'text-primary-600 bg-primary-100'
      case 'locked': return 'text-gray-400 bg-gray-100'
      default: return 'text-gray-400 bg-gray-100'
    }
  }

  const getButtonText = (status, challengeId) => {
    switch (status) {
      case 'complete': return 'Retry Challenge'
      case 'available': return 'Start Challenge'
      case 'locked': return `Complete Challenge ${challengeId - 1} First`
      default: return 'Locked'
    }
  }

  const handleChallengeClick = (challenge, status) => {
    console.log(`Dashboard: Challenge ${challenge.id} clicked`)
    console.log(`Dashboard: Status: ${status}`)

    if (status === 'locked') {
      console.log(`Dashboard: Challenge ${challenge.id} is locked - not navigating`)
      return
    }

    console.log(`Dashboard: Navigating to ${challenge.path}`)
    navigate(challenge.path)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.full_name || user?.email}
          </h1>
          <p className="text-gray-600">
            Complete challenges in sequence to unlock the next level and master quality planning excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ProgressTracker currentStage={progress.completedChallenges} />
            </motion.div>

            {/* Stats Cards */}
            <div className="mt-6 space-y-4">
              <motion.div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiAward} className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                    <p className="text-lg font-semibold text-gray-900">{progress.overallScore}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Challenges Completed</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {progress.completedChallenges} of {progress.totalChallenges}
                    </p>
                  </div>
                </div>
              </motion.div>

              {progress.completedChallenges === progress.totalChallenges && (
                <motion.div
                  className="bg-gradient-to-r from-success-500 to-success-600 rounded-lg p-4 text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiAward} className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Certificate Ready!</p>
                      <button
                        onClick={() => navigate('/conclusion')}
                        className="text-sm text-white underline hover:no-underline"
                      >
                        Generate your certificate
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quality Planning Challenges</h2>
              <p className="text-gray-600">Complete each challenge in order.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => {
                const status = getChallengeStatus(challenge.id)
                const IconComponent = getStatusIcon(status)
                const colorClass = getStatusColor(status)
                const challengeProgress = progress.challenges[challenge.id]
                const isLocked = status === 'locked'

                return (
                  <motion.div
                    key={challenge.id}
                    className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-200 ${
                      isLocked
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:shadow-md hover:border-primary-200 cursor-pointer transform hover:scale-[1.02]'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    onClick={() => handleChallengeClick(challenge, status)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                        <SafeIcon icon={IconComponent} className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        {challengeProgress?.score && (
                          <div>
                            <p className="text-sm text-gray-600">Best Score</p>
                            <p className="text-lg font-semibold text-success-600">
                              {challengeProgress.score}%
                            </p>
                          </div>
                        )}
                        {challengeProgress?.attempts && (
                          <div className="mt-1">
                            <p className="text-xs text-gray-500">
                              {challengeProgress.attempts} attempt{challengeProgress.attempts > 1 ? 's' : ''}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Challenge {challenge.id}
                    </h3>
                    <h4 className={`text-md font-medium mb-2 ${isLocked ? 'text-gray-400' : 'text-primary-600'}`}>
                      {challenge.title}
                    </h4>
                    <p className={`mb-4 text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                      {challenge.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center space-x-2 font-medium ${
                        isLocked ? 'text-gray-400' : 'text-primary-600 hover:text-primary-700'
                      }`}>
                        <SafeIcon icon={status === 'complete' ? FiRotateCcw : FiPlay} className="w-4 h-4" />
                        <span>{getButtonText(status, challenge.id)}</span>
                      </div>
                      {status === 'complete' && (
                        <div className="flex items-center space-x-2 text-success-600">
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Next Steps */}
            <motion.div
              className="mt-8 bg-primary-50 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Sequential Learning Path
              </h3>
              <div className="space-y-2 text-sm text-primary-700">
                <p>• Complete challenges in order - each builds on quality planning fundamentals</p>
                <p>• Unlimited retries available for deeper understanding</p>
                <p>• Model answers shown after correct responses</p>
                <p>• Hands-on exercises follow each challenge completion</p>
                {progress.completedChallenges < 4 && (
                  <p className="font-semibold">
                    • Next: Complete Challenge {progress.completedChallenges + 1} to unlock Challenge {Math.min(progress.completedChallenges + 2, 4)}
                  </p>
                )}
                {progress.completedChallenges === 4 && (
                  <p className="font-semibold text-success-700">• All challenges complete - generate your Quality Planning Navigator Expert certificate!</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
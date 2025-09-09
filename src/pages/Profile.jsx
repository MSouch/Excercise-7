import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { useProgress } from '../hooks/useProgress.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiMail, FiCalendar, FiAward, FiTarget, FiClock } = FiIcons

const Profile = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'progress', label: 'Progress', icon: FiTarget },
    { id: 'achievements', label: 'Achievements', icon: FiAward }
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and view your training progress</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiUser} className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.user_metadata?.full_name || user?.full_name || 'User'}
                </h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border-l-2 border-primary-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium text-gray-900">
                          {user?.user_metadata?.full_name || user?.full_name || 'Not provided'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user?.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiTarget} className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Navigator Domain</p>
                        <p className="font-medium text-gray-900">Quality Planning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'progress' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <p className="text-2xl font-bold text-primary-600">{progress.overallScore}%</p>
                      <p className="text-sm text-gray-600">Overall Progress</p>
                    </div>
                    <div className="text-center p-4 bg-success-50 rounded-lg">
                      <p className="text-2xl font-bold text-success-600">
                        {progress.completedChallenges}/{progress.totalChallenges}
                      </p>
                      <p className="text-sm text-gray-600">Challenges Completed</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">
                        {progress.completedChallenges === progress.totalChallenges ? 'Complete' : 'In Progress'}
                      </p>
                      <p className="text-sm text-gray-600">Status</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(progress.challenges).map(([challengeId, challengeData]) => (
                      <div
                        key={challengeId}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              challengeData.status === 'complete'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {challengeId}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Challenge {challengeId}</p>
                            <p className="text-sm text-gray-600">
                              Status: {challengeData.status === 'complete' ? 'Completed' : 'In Progress'}
                            </p>
                          </div>
                        </div>
                        {challengeData.score && (
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{challengeData.score}%</p>
                            <p className="text-sm text-gray-600">Score</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements & Badges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {progress.completedChallenges >= 1 && (
                      <div className="flex items-center space-x-3 p-4 bg-success-50 rounded-lg">
                        <SafeIcon icon={FiAward} className="w-8 h-8 text-success-600" />
                        <div>
                          <p className="font-medium text-gray-900">Quality System Integration Master</p>
                          <p className="text-sm text-gray-600">Completed Challenge 1</p>
                        </div>
                      </div>
                    )}
                    {progress.completedChallenges >= 2 && (
                      <div className="flex items-center space-x-3 p-4 bg-success-50 rounded-lg">
                        <SafeIcon icon={FiAward} className="w-8 h-8 text-success-600" />
                        <div>
                          <p className="font-medium text-gray-900">QA/QC Balance Expert</p>
                          <p className="text-sm text-gray-600">Completed Challenge 2</p>
                        </div>
                      </div>
                    )}
                    {progress.completedChallenges >= 3 && (
                      <div className="flex items-center space-x-3 p-4 bg-success-50 rounded-lg">
                        <SafeIcon icon={FiAward} className="w-8 h-8 text-success-600" />
                        <div>
                          <p className="font-medium text-gray-900">ITP Development Specialist</p>
                          <p className="text-sm text-gray-600">Completed Challenge 3</p>
                        </div>
                      </div>
                    )}
                    {progress.completedChallenges >= 4 && (
                      <div className="flex items-center space-x-3 p-4 bg-success-50 rounded-lg">
                        <SafeIcon icon={FiAward} className="w-8 h-8 text-success-600" />
                        <div>
                          <p className="font-medium text-gray-900">Quality Integration Pro</p>
                          <p className="text-sm text-gray-600">Completed Challenge 4</p>
                        </div>
                      </div>
                    )}
                    {progress.completedChallenges === progress.totalChallenges && (
                      <div className="md:col-span-2 flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-success-50 rounded-lg border-2 border-primary-200">
                        <SafeIcon icon={FiAward} className="w-10 h-10 text-primary-600" />
                        <div>
                          <p className="font-bold text-lg text-gray-900">Certified Quality Planning Navigator Expert</p>
                          <p className="text-sm text-gray-600">Mastered all quality planning principles</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {progress.completedChallenges === 0 && (
                    <div className="text-center py-8">
                      <SafeIcon icon={FiClock} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Start completing challenges to earn achievements!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
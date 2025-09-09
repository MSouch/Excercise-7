import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiPlay, FiTarget, FiUsers, FiAward, FiClock } = FiIcons

const Home = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Quality Planning Navigator
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              A Sequential Decision-Based Learning Experience for Planners
            </p>
            <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">
              You're a planner at Gulf Coast Petrochemical, preparing for a critical turnaround on Unit 200 - a high-pressure catalytic cracking unit. Master quality management principles through realistic scenarios that prevent safety incidents, regulatory violations, and millions in rework costs.
            </p>

            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <span>Continue Training</span>
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/start"
                className="inline-flex items-center space-x-2 bg-success-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-success-600 transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Start Simulation</span>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Master These 4 Quality Planning Principles</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Navigate four realistic quality planning challenges that will test and reinforce your understanding of quality management principles. Each scenario presents a critical decision point where your choices directly impact project outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiTarget,
                title: 'Quality System Integration',
                description: 'Apply quality management fundamentals to real planning situations from project initiation'
              },
              {
                icon: FiUsers,
                title: 'QA vs QC Balance',
                description: 'Distinguish when to emphasize prevention versus detection approaches'
              },
              {
                icon: FiAward,
                title: 'Verification Planning',
                description: 'Develop effective Inspection and Test Plans for complex work across multiple disciplines'
              },
              {
                icon: FiClock,
                title: 'Quality Integration',
                description: 'Embed quality requirements seamlessly into work packages for maximum compliance'
              }
            ].map((objective, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={objective.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {objective.title}
                </h3>
                <p className="text-gray-600">
                  {objective.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Complete the simulation in 60-90 minutes and earn your Quality Planning Expert certification
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Face Realistic Scenarios',
                description: 'Each challenge presents a realistic quality planning scenario with four response options based on actual turnaround challenges'
              },
              {
                step: '2',
                title: 'Learn from Feedback',
                description: 'Wrong answers provide learning feedback and consequences while guiding you toward quality management best practices'
              },
              {
                step: '3',
                title: 'Practice Skills',
                description: 'Correct answers lead to hands-on exercises that reinforce quality planning approaches with real-world tools'
              },
              {
                step: '4',
                title: 'Earn Certification',
                description: 'Complete all four challenges to earn your Quality Planning Navigator Expert certification'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Master Quality Planning?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Your facility's operational excellence depends on the quality planning practices you're about to master. Quality failures can result in safety incidents, regulatory violations, and millions in rework costs.
            </p>
            {!user && (
              <Link
                to="/start"
                className="inline-flex items-center space-x-2 bg-success-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-success-600 transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Start Simulation</span>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
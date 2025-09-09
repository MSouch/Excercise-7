import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth.jsx'
import SafeIcon from '../../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiLogOut, FiHome } = FiIcons

const Header = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://greta-preview.s3.us-east-2.amazonaws.com/assets/logo.svg"
                alt="APLS Logo"
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-primary-600">Quality Planning Navigator</h1>
                <p className="text-xs text-gray-500">Part of the Navigator Series</p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <SafeIcon icon={FiHome} className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
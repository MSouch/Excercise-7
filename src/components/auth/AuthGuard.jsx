import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useProgress } from '../../hooks/useProgress.jsx'

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth()
  const { progress, loading: progressLoading } = useProgress()
  const location = useLocation()

  console.log('AuthGuard: Checking access for:', location.pathname)
  console.log('AuthGuard: User:', !!user)
  console.log('AuthGuard: Auth loading:', loading)
  console.log('AuthGuard: Progress loading:', progressLoading)

  // Show loading spinner while either auth or progress is loading
  if (loading || progressLoading) {
    console.log('AuthGuard: Still loading, showing spinner')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  // Redirect to start if no user
  if (!user) {
    console.log('AuthGuard: No user, redirecting to /start')
    return <Navigate to="/start" state={{ from: location }} replace />
  }

  // For challenge routes, let the Challenge component handle its own gating logic
  // AuthGuard should not block challenge navigation - that's handled in Challenge.jsx
  const pathMatch = location.pathname.match(/\/challenge\/(\d+)/)
  if (pathMatch) {
    console.log('AuthGuard: Challenge route detected, allowing access (gating handled by Challenge component)')
    return children
  }

  // Check conclusion access
  if (location.pathname === '/conclusion' && progress.completedChallenges < 4) {
    console.log(`AuthGuard: Conclusion blocked - only ${progress.completedChallenges}/4 challenges completed`)
    return <Navigate to="/dashboard" replace />
  }

  console.log('AuthGuard: Access granted for:', location.pathname)
  return children
}

export default AuthGuard
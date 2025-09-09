import React, { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('qualityPlanningNavigatorUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('qualityPlanningNavigatorUser')
      }
    }
    setLoading(false)
  }, [])

  const registerUser = (fullName, email) => {
    const userData = {
      id: `user_${Date.now()}`,
      full_name: fullName,
      email: email,
      created_at: new Date().toISOString(),
      user_metadata: {
        full_name: fullName,
        email: email
      }
    }

    setUser(userData)
    localStorage.setItem('qualityPlanningNavigatorUser', JSON.stringify(userData))

    return { data: { user: userData }, error: null }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('qualityPlanningNavigatorUser')
    localStorage.removeItem('qualityPlanningNavigatorProgress')
  }

  const value = {
    user,
    loading,
    error,
    registerUser,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
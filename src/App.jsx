import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './hooks/useAuth.jsx'
import AuthGuard from './components/auth/AuthGuard.jsx'

// Pages
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Challenge from './pages/Challenge.jsx'
import Conclusion from './pages/Conclusion.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            <Route 
              path="/challenge/:id" 
              element={
                <AuthGuard>
                  <Challenge />
                </AuthGuard>
              } 
            />
            <Route 
              path="/conclusion" 
              element={
                <AuthGuard>
                  <Conclusion />
                </AuthGuard>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/common/Layout.jsx'
import ChallengeQuestion from '../components/challenge/ChallengeQuestion.jsx'
import ExerciseForm from '../components/exercise/ExerciseForm.jsx'
import { challengeContent } from '../data/challengeData.js'
import { exerciseContent } from '../data/exerciseData.js'
import { useProgress } from '../hooks/useProgress.jsx'

const Challenge = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { progress, loading } = useProgress()
  const [currentPhase, setCurrentPhase] = useState('challenge') // 'challenge' or 'exercise'

  const challengeId = parseInt(id)
  const challenge = challengeContent[challengeId]
  const exercise = exerciseContent[challengeId]

  console.log(`Challenge Page: Loading Challenge ${challengeId}`)
  console.log(`Challenge Page: Loading state:`, loading)
  console.log(`Challenge Page: Challenge exists:`, !!challenge)
  console.log(`Challenge Page: Current progress:`, progress)

  // Reset state when challenge ID changes
  useEffect(() => {
    console.log(`Challenge Page: Resetting state for Challenge ${challengeId}`)
    setCurrentPhase('challenge')
  }, [challengeId])

  // Handle loading and gating logic
  useEffect(() => {
    console.log(`Challenge Page: useEffect triggered for Challenge ${challengeId}`)
    console.log(`Challenge Page: Loading:`, loading)

    // Don't perform any navigation while still loading
    if (loading) {
      console.log(`Challenge Page: Still loading, skipping navigation logic`)
      return
    }

    // Check if challenge content exists
    if (!challenge) {
      console.log(`Challenge Page: Challenge ${challengeId} not found, redirecting to dashboard`)
      navigate('/dashboard')
      return
    }

    // Gating logic: Challenge 1 is always accessible
    if (challengeId === 1) {
      console.log(`Challenge Page: Challenge 1 - Always accessible`)
      return
    }

    // For N > 1, allow if id <= completedChallenges + 1
    const completedChallenges = progress.completedChallenges || 0
    console.log(`Challenge Page: Completed challenges: ${completedChallenges}`)
    console.log(`Challenge Page: Gating check: Challenge ${challengeId} <= ${completedChallenges + 1}? ${challengeId <= completedChallenges + 1}`)
    
    if (challengeId > completedChallenges + 1) {
      console.log(`Challenge Page: Challenge ${challengeId} is locked (need to complete Challenge ${challengeId - 1} first)`)
      console.log(`Challenge Page: Redirecting to dashboard`)
      navigate('/dashboard')
      return
    }

    console.log(`Challenge Page: Challenge ${challengeId} access granted`)
  }, [loading, challengeId, challenge, progress.completedChallenges, navigate])

  const handleChallengeComplete = () => {
    console.log(`Challenge Page: Challenge ${challengeId} completed, moving to exercise phase`)
    setCurrentPhase('exercise')
  }

  const handleExerciseComplete = () => {
    console.log(`Challenge Page: Exercise ${challengeId} completed`)
    // Navigate to next challenge or conclusion based on completion
    if (challengeId < 4) {
      console.log(`Challenge Page: Navigating to Challenge ${challengeId + 1}`)
      navigate(`/challenge/${challengeId + 1}`)
    } else {
      console.log(`Challenge Page: All challenges complete, navigating to conclusion`)
      navigate('/conclusion')
    }
  }

  // Show loading spinner while loading
  if (loading) {
    console.log(`Challenge Page: Rendering loading spinner`)
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    )
  }

  // Show not found if challenge doesn't exist (this should rarely be reached due to useEffect redirect)
  if (!challenge) {
    console.log(`Challenge Page: Challenge ${challengeId} not found, showing error`)
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Challenge Not Available</h2>
            <p className="text-gray-600">Complete previous challenges to unlock this one.</p>
          </div>
        </div>
      </Layout>
    )
  }

  console.log(`Challenge Page: Rendering Challenge ${challengeId} in ${currentPhase} phase`)

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-sm text-gray-600">
            <span className="font-medium text-primary-700">Challenge {challenge.id}:</span> {challenge.title}
            <span className="ml-2 text-gray-400">•</span>
            <span className="ml-2">Flow: 1) Question → 2) Model Answer → 3) Exercise</span>
          </div>
          {currentPhase === 'challenge' ? (
            <ChallengeQuestion 
              challenge={challenge} 
              onComplete={handleChallengeComplete} 
            />
          ) : (
            <ExerciseForm 
              exercise={exercise} 
              onComplete={handleExerciseComplete} 
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Challenge
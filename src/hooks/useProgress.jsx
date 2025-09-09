import { useState, useEffect } from 'react'
import { useAuth } from './useAuth.jsx'

export const useProgress = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState({
    challenges: {},
    exercises: {},
    overallScore: 0,
    completedChallenges: 0,
    totalChallenges: 4
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('useProgress: useEffect triggered, user:', !!user)
    if (user) {
      loadProgress()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadProgress = () => {
    try {
      console.log('useProgress: Loading progress from localStorage')
      const stored = localStorage.getItem('qualityPlanningNavigatorProgress')
      if (stored) {
        const progressData = JSON.parse(stored)
        console.log('useProgress: Loaded progress:', progressData)
        setProgress(progressData)
      } else {
        console.log('useProgress: No stored progress, using defaults')
        const defaultProgress = {
          challenges: {},
          exercises: {},
          overallScore: 0,
          completedChallenges: 0,
          totalChallenges: 4
        }
        setProgress(defaultProgress)
        localStorage.setItem('qualityPlanningNavigatorProgress', JSON.stringify(defaultProgress))
      }
    } catch (error) {
      console.error('useProgress: Error loading progress:', error)
      const defaultProgress = {
        challenges: {},
        exercises: {},
        overallScore: 0,
        completedChallenges: 0,
        totalChallenges: 4
      }
      setProgress(defaultProgress)
      localStorage.setItem('qualityPlanningNavigatorProgress', JSON.stringify(defaultProgress))
    } finally {
      setLoading(false)
    }
  }

  const saveProgress = (progressData) => {
    try {
      console.log('useProgress: Saving progress:', progressData)
      localStorage.setItem('qualityPlanningNavigatorProgress', JSON.stringify(progressData))
      setProgress(progressData)
    } catch (error) {
      console.error('useProgress: Error saving progress:', error)
    }
  }

  const updateProgress = async (challengeId, answers, isCorrect, score) => {
    try {
      console.log(`useProgress: Updating Challenge ${challengeId}:`, { challengeId, answers, isCorrect, score })

      const currentProgress = progress.challenges[challengeId] || { attempts: 0 }

      const updatedProgress = {
        ...progress,
        challenges: {
          ...progress.challenges,
          [challengeId]: {
            status: isCorrect ? 'complete' : 'incomplete',
            answers: answers,
            score: score,
            attempts: currentProgress.attempts + 1,
            completed_at: isCorrect ? new Date().toISOString() : null
          }
        }
      }

      // Recalculate completion stats
      const completedCount = Object.values(updatedProgress.challenges).filter(
        challenge => challenge.status === 'complete'
      ).length

      updatedProgress.completedChallenges = completedCount
      updatedProgress.overallScore = Math.round((completedCount / updatedProgress.totalChallenges) * 100)

      console.log(`useProgress: Challenge ${challengeId} updated. New completion count: ${completedCount}`)

      saveProgress(updatedProgress)
      return { error: null }
    } catch (error) {
      console.error('useProgress: Error updating progress:', error)
      return { error }
    }
  }

  const updateExerciseProgress = async (exerciseId, responses, score) => {
    try {
      console.log(`useProgress: Updating Exercise ${exerciseId}:`, { exerciseId, responses, score })

      const updatedProgress = {
        ...progress,
        exercises: {
          ...progress.exercises,
          [exerciseId]: {
            responses,
            score,
            completed_at: new Date().toISOString()
          }
        }
      }

      saveProgress(updatedProgress)
      return { error: null }
    } catch (error) {
      console.error('useProgress: Error updating exercise progress:', error)
      return { error }
    }
  }

  const fetchProgress = () => {
    console.log('useProgress: fetchProgress called (force refresh)')
    loadProgress()
  }

  return {
    progress,
    loading,
    updateProgress,
    updateExerciseProgress,
    fetchProgress
  }
}
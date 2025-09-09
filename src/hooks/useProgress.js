import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

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
    if (user) {
      fetchProgress()
    }
  }, [user])

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('simulation_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('navigator_domain', 'quality_planning')

      if (error) throw error

      const progressData = {
        challenges: {},
        exercises: {},
        overallScore: 0,
        completedChallenges: 0,
        totalChallenges: 4
      }

      data.forEach(item => {
        if (item.challenge_id) {
          progressData.challenges[item.challenge_id] = {
            status: item.status,
            score: item.score,
            attempts: item.attempts,
            answers: item.answers
          }
          if (item.status === 'complete') {
            progressData.completedChallenges++
          }
        }
      })

      progressData.overallScore = Math.round(
        (progressData.completedChallenges / progressData.totalChallenges) * 100
      )

      setProgress(progressData)
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (challengeId, answers, isCorrect, score) => {
    try {
      const currentProgress = progress.challenges[challengeId] || { attempts: 0 }

      const { error } = await supabase.from('simulation_progress').upsert({
        user_id: user.id,
        navigator_domain: 'quality_planning',
        challenge_id: challengeId,
        status: isCorrect ? 'complete' : 'incomplete',
        answers: answers,
        score: score,
        attempts: currentProgress.attempts + 1,
        completed_at: isCorrect ? new Date().toISOString() : null
      })

      if (error) throw error

      await fetchProgress()
      return { error: null }
    } catch (error) {
      console.error('Error updating progress:', error)
      return { error }
    }
  }

  return {
    progress,
    loading,
    updateProgress,
    fetchProgress
  }
}
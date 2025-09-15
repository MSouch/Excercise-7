import React, {useState} from 'react'
import {motion} from 'framer-motion'
import {useProgress} from '../../hooks/useProgress.jsx'
import SafeIcon from '../../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const {FiClock, FiMapPin, FiAlertCircle, FiCheckCircle, FiArrowRight, FiBookOpen, FiTarget} = FiIcons

const ChallengeQuestion = ({challenge, onComplete}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showModelAnswer, setShowModelAnswer] = useState(false)
  const {updateProgress} = useProgress()

  const handleAnswerSelect = (answer) => {
    if (!showFeedback) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedAnswer) return
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const correct = selectedAnswer === challenge.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)
    setAttempts(prev => prev + 1)

    // Calculate score based on attempts (still reward fewer attempts but don't penalize)
    const score = correct ? Math.max(100 - (attempts * 5), 75) : 0

    await updateProgress(challenge.id, {selectedAnswer, attempts: attempts + 1}, correct, score)

    if (correct) { 
      // Reveal model answer explicitly; user will continue manually
      setShowModelAnswer(true)
    }
  }

  const handleRetry = () => {
    setSelectedAnswer('')
    setShowFeedback(false)
    setIsCorrect(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const feedback = challenge.feedback[selectedAnswer]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        {/* Scenario Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiClock} className="w-5 h-5" />
              <span className="text-sm font-medium">{challenge.scenario.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-200">
              <SafeIcon icon={FiTarget} className="w-4 h-4" />
              <span className="text-sm">Attempts: {attempts}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Challenge {challenge.id}: {challenge.title}</h1>
          <p className="text-primary-100 text-sm">1) Question → 2) Model Answer → 3) Exercise</p>
        </div>

        {/* Scenario Content */}
        <div className="p-6 border-b border-gray-200">
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {challenge.scenario.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question and Options */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {challenge.question}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(challenge.options).map(([key, option]) => (
              <motion.div
                key={key}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAnswer === key
                    ? showFeedback
                      ? isCorrect
                        ? 'border-success-500 bg-success-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-primary-500 bg-primary-50'
                    : key === challenge.correctAnswer && showModelAnswer
                    ? 'border-success-500 bg-success-100 ring-2 ring-success-300'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => handleAnswerSelect(key)}
                whileHover={!showFeedback ? {scale: 1.02} : {}}
                whileTap={!showFeedback ? {scale: 0.98} : {}}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-grow">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === key
                        ? showFeedback
                          ? isCorrect
                            ? 'border-success-500 bg-success-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-primary-500 bg-primary-500'
                        : key === challenge.correctAnswer && showModelAnswer
                        ? 'border-success-500 bg-success-500'
                        : 'border-gray-300'
                    }`}>
                      {(selectedAnswer === key || (key === challenge.correctAnswer && showModelAnswer)) && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <span className="font-medium text-primary-600 mr-2">{key})</span>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </div>
                  {key === challenge.correctAnswer && showModelAnswer && (
                    <div className="ml-3 flex items-center space-x-1 text-success-600">
                      <SafeIcon icon={FiBookOpen} className="w-4 h-4" />
                      <span className="text-sm font-medium">Correct Answer</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {!showFeedback && !showModelAnswer && (
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={!selectedAnswer}
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Model Answer Section */}
        {showModelAnswer && (
          <motion.div
            className="border-t-2 border-success-500 bg-success-50 p-6"
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            transition={{duration: 0.5}}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg mb-3 text-success-800">
                  ✓ Model Answer Explanation
                </h3>
                <div className="text-sm leading-relaxed mb-4 text-success-700">
                  <p className="font-medium mb-2">
                    The correct answer is <span className="font-bold">({challenge.correctAnswer}) {challenge.options[challenge.correctAnswer]}</span>
                  </p>
                  <p>{challenge.feedback[challenge.correctAnswer].explanation}</p>
                </div>
                    <div className="flex items-center justify-center mt-6">
                      <button
                        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onComplete(challenge.id) }}
                        className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        <span>Continue</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                      </button>
                    </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Feedback Section */}
        {showFeedback && feedback && !showModelAnswer && (
          <motion.div
            className={`border-t-2 p-6 ${
              isCorrect ? 'border-success-500 bg-success-50' : 'border-red-500 bg-red-50'
            }`}
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            transition={{duration: 0.3}}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon
                icon={isCorrect ? FiCheckCircle : FiAlertCircle}
                className={`w-6 h-6 mt-1 flex-shrink-0 ${
                  isCorrect ? 'text-success-600' : 'text-red-600'
                }`}
              />
              <div className="flex-grow">
                <h3 className={`font-semibold text-lg mb-3 ${
                  isCorrect ? 'text-success-800' : 'text-red-800'
                }`}>
                  {isCorrect ? '✓ Excellent!' : '❌ Not quite right - try again!'}
                </h3>
                <div className={`text-sm leading-relaxed mb-4 ${
                  isCorrect ? 'text-success-700' : 'text-red-700'
                }`}>
                  {feedback.message}
                </div>

                {feedback.guidingQuestion && (
                  <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      Think about this: {feedback.guidingQuestion}
                    </p>
                  </div>
                )}

                {feedback.explanation && (
                  <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Learning:</p>
                    <p className="text-sm text-gray-600">{feedback.explanation}</p>
                  </div>
                )}

                <div className="flex justify-center space-x-4 mt-6">
                  {!isCorrect && (
                    <button
                      onClick={() => { handleRetry(); }}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                  {isCorrect && !showModelAnswer && (
                    <button
                      onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setShowModelAnswer(true) }}
                      className="bg-success-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-success-700 transition-colors"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ChallengeQuestion
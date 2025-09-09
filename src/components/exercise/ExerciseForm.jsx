import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../hooks/useAuth.jsx'
import {useProgress} from '../../hooks/useProgress.jsx'
import SafeIcon from '../../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const {FiSave,FiCheckCircle,FiArrowRight,FiBookOpen,FiAlertCircle}=FiIcons

const ExerciseForm=({exercise,onComplete})=> {
  const {user}=useAuth()
  const {updateExerciseProgress}=useProgress()
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false)
  const [saved,setSaved]=useState(false)
  const [completed,setCompleted]=useState(false)
  const [showModelAnswer,setShowModelAnswer]=useState(false)
  const [canProceed,setCanProceed]=useState(false)
  const [isEditing,setIsEditing]=useState(true)
  const [validationErrors,setValidationErrors]=useState({})

  useEffect(()=> {
    // Initialize form data
    const initialData={}
    exercise.fields.forEach(field=> {
      if (field.type==='ranking') {
        initialData[field.id]=field.options || []
      } else {
        initialData[field.id]=''
      }
    })
    setFormData(initialData)
  },[exercise])

  useEffect(()=> {
    // Auto-save every 30 seconds while editing only
    const interval=setInterval(()=> {
      if (isEditing && Object.keys(formData).length > 0 && !completed) {
        handleAutoSave()
      }
    },30000)
    return ()=> clearInterval(interval)
  },[formData,isEditing,completed])

  const validateForm=()=> {
    const errors={}
    let isValid=true

    exercise.fields.forEach(field=> {
      const value=formData[field.id]
      
      // Check if field is required (all fields are required)
      if (field.type==='ranking') {
        if (!value || value.length===0) {
          errors[field.id]='Please complete the ranking'
          isValid=false
        }
      } else if (field.type==='select') {
        if (!value || value.trim()==='') {
          errors[field.id]='Please select an option'
          isValid=false
        }
      } else {
        // Text, textarea, number fields
        if (!value || value.toString().trim()==='') {
          errors[field.id]='This field is required'
          isValid=false
        }
      }
    })

    setValidationErrors(errors)
    return isValid
  }

  const handleInputChange=(fieldId,value)=> {
    setFormData(prev=> ({
      ...prev,
      [fieldId]: value
    }))
    setSaved(false)
    setIsEditing(true)
    
    // Clear validation error for this field
    if (validationErrors[fieldId]) {
      setValidationErrors(prev=> ({
        ...prev,
        [fieldId]: ''
      }))
    }
  }

  const handleRankingChange=(fieldId,items)=> {
    setFormData(prev=> ({
      ...prev,
      [fieldId]: items
    }))
    setSaved(false)
    setIsEditing(true)
    
    // Clear validation error for this field
    if (validationErrors[fieldId]) {
      setValidationErrors(prev=> ({
        ...prev,
        [fieldId]: ''
      }))
    }
  }

  const handleAutoSave=()=> {
    if (!user || loading || !isEditing || completed) return

    // Save to localStorage for auto-save functionality
    const exerciseKey=`exercise_${exercise.id}_${user.id}`
    localStorage.setItem(exerciseKey,JSON.stringify(formData))
  setSaved(true)
  // Keep banner minimal and only during editing; will be hidden when not editing/completed
  setTimeout(()=> setSaved(false),1500)
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    
    // Validate all fields are completed
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField=Object.keys(validationErrors)[0]
      if (firstErrorField) {
        const element=document.getElementById(firstErrorField)
        if (element) {
          element.scrollIntoView({behavior: 'smooth',block: 'center'})
          element.focus()
        }
      }
      return
    }

    setLoading(true)

    try {
      const score=calculateScore()
      await updateExerciseProgress(exercise.id,formData,score)
      setCompleted(true)
      setIsEditing(false)
      // Show model answer immediately and allow explicit continue
      setShowModelAnswer(true)
      setCanProceed(true)
    } catch (error) {
      console.error('Submission error:',error)
    } finally {
      setLoading(false)
    }
  }

  const handleProceed=()=> {
    onComplete(exercise.id)
  }

  const calculateScore=()=> {
    // Simple scoring based on completion
    const completedFields=exercise.fields.filter(field=> {
      const value=formData[field.id]
      return value && value.toString().trim().length > 0
    })
    return Math.round((completedFields.length / exercise.fields.length) * 100)
  }

  const renderField=(field)=> {
    const value=formData[field.id] || ''
    const hasError=validationErrors[field.id]

    switch (field.type) {
      case 'text':
        return (
          <div>
            <input
              id={field.id}
              type="text"
              value={value}
              onChange={(e)=> handleInputChange(field.id,e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder={field.placeholder}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-red-600">
                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                <span className="text-sm">{hasError}</span>
              </div>
            )}
          </div>
        )

      case 'number':
        return (
          <div>
            <input
              id={field.id}
              type="number"
              min="1"
              max="10"
              value={value}
              onChange={(e)=> handleInputChange(field.id,e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder={field.placeholder}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-red-600">
                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                <span className="text-sm">{hasError}</span>
              </div>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div>
            <textarea
              id={field.id}
              value={value}
              onChange={(e)=> handleInputChange(field.id,e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder={field.placeholder}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-red-600">
                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                <span className="text-sm">{hasError}</span>
              </div>
            )}
          </div>
        )

      case 'select':
        return (
          <div>
            <select
              id={field.id}
              value={value}
              onChange={(e)=> handleInputChange(field.id,e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option...</option>
              {field.options?.map((option,index)=> (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {hasError && (
              <div className="flex items-center mt-1 text-red-600">
                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                <span className="text-sm">{hasError}</span>
              </div>
            )}
          </div>
        )

      case 'ranking':
        return (
          <div>
            <RankingField
              fieldId={field.id}
              items={field.options || []}
              value={value}
              onChange={(items)=> handleRankingChange(field.id,items)}
              hasError={hasError}
            />
            {hasError && (
              <div className="flex items-center mt-1 text-red-600">
                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                <span className="text-sm">{hasError}</span>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Check if form has any incomplete fields
  const hasIncompleteFields=Object.keys(validationErrors).length > 0 || 
    exercise.fields.some(field=> {
      const value=formData[field.id]
      if (field.type==='ranking') {
        return !value || value.length===0
      }
      return !value || value.toString().trim()===''
    })

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{duration: 0.5}}
      >
        <div className="bg-gradient-to-r from-success-600 to-success-700 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">{exercise.title}</h1>
          <p className="text-success-100">{exercise.description}</p>
          <div className="mt-3 text-success-100 text-sm">
            <SafeIcon icon={FiAlertCircle} className="w-4 h-4 inline mr-1" />
            All fields are required to proceed to the next challenge
          </div>
        </div>

        <div className="p-6">
          {saved && isEditing && !completed && (
            <motion.div
              className="bg-green-50 border border-green-200 rounded-md p-3 mb-6 flex items-center space-x-2"
              initial={{opacity: 0,y: -10}}
              animate={{opacity: 1,y: 0}}
              exit={{opacity: 0,y: -10}}
            >
              <SafeIcon icon={FiSave} className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Progress auto-saved</span>
            </motion.div>
          )}

          {completed && !showModelAnswer ? (
            <motion.div
              className="text-center py-12"
              initial={{opacity: 0,scale: 0.9}}
              animate={{opacity: 1,scale: 1}}
              transition={{duration: 0.5}}
            >
              <SafeIcon icon={FiCheckCircle} className="w-16 h-16 text-success-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Exercise Completed!</h2>
              <p className="text-gray-600 mb-4">Great work on completing this hands-on exercise.</p>
              <div className="flex items-center justify-center space-x-2 text-success-600">
                <span className="text-sm font-medium">Preparing model answer...</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </div>
            </motion.div>
          ) : showModelAnswer ? (
            <motion.div
              className="border-t-2 border-success-500 bg-success-50 p-6 -m-6 mt-0"
              initial={{opacity: 0,height: 0}}
              animate={{opacity: 1,height: 'auto'}}
              transition={{duration: 0.5}}
            >
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-success-600 mt-1 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-4 text-success-800">
                    ✓ Exercise Model Answer & Key Insights
                  </h3>
                  <div className="space-y-4 text-success-700">
                    {exercise.modelAnswer?.sections?.map((section,index)=> (
                      <div key={index} className="bg-white bg-opacity-70 rounded-lg p-4">
                        <h4 className="font-semibold text-success-800 mb-2">{section.title}</h4>
                        <div className="text-sm leading-relaxed space-y-2">
                          {section.points?.map((point,pointIndex)=> (
                            <p key={pointIndex} className="flex items-start space-x-2">
                              <span className="text-success-600 font-bold">•</span>
                              <span>{point}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}

                    {exercise.modelAnswer?.keyTakeaways && (
                      <div className="bg-success-100 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-success-800 mb-2">🎯 Key Takeaways</h4>
                        <div className="text-sm space-y-1">
                          {exercise.modelAnswer.keyTakeaways.map((takeaway,index)=> (
                            <p key={index} className="flex items-start space-x-2">
                              <span className="text-success-600 font-bold">✓</span>
                              <span className="font-medium">{takeaway}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Proceed Button */}
                  <div className="flex justify-center mt-8">
                    {canProceed ? (
                      <motion.button
                        onClick={handleProceed}
                        className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
                        initial={{opacity: 0,scale: 0.9}}
                        animate={{opacity: 1,scale: 1}}
                        transition={{duration: 0.3}}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                      >
                        <span>Continue to Next Challenge</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <div className="flex items-center space-x-2 text-success-600 px-8 py-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-success-600"></div>
                        <span className="text-sm font-medium">Please review the model answer...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {exercise.fields.map((field,index)=> (
                <motion.div
                  key={field.id}
                  className="space-y-2"
                  initial={{opacity: 0,x: -20}}
                  animate={{opacity: 1,x: 0}}
                  transition={{delay: index * 0.1}}
                >
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {renderField(field)}
                </motion.div>
              ))}

              {hasIncompleteFields && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex items-center space-x-2 text-amber-700">
                    <SafeIcon icon={FiAlertCircle} className="w-5 h-5" />
                    <span className="font-medium">Please complete all required fields to proceed</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading || hasIncompleteFields}
                  className="bg-success-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-success-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Submitting...' : 'Complete Exercise'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const RankingField=({fieldId,items,value,onChange,hasError})=> {
  const [rankedItems,setRankedItems]=useState(value.length > 0 ? value : items)

  const handleDragStart=(e,index)=> {
    e.dataTransfer.setData('text/plain',index)
  }

  const handleDragOver=(e)=> {
    e.preventDefault()
  }

  const handleDrop=(e,dropIndex)=> {
    e.preventDefault()
    const dragIndex=parseInt(e.dataTransfer.getData('text/plain'))
    const newItems=[...rankedItems]
    const draggedItem=newItems[dragIndex]

    newItems.splice(dragIndex,1)
    newItems.splice(dropIndex,0,draggedItem)

    setRankedItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Drag items to rank them (1=highest priority)
        <span className="text-red-500 ml-1">*</span>
      </p>
      <div className={`space-y-2 ${hasError ? 'border-2 border-red-300 rounded-md p-2 bg-red-50' : ''}`}>
        {rankedItems.map((item,index)=> (
          <div
            key={item}
            draggable
            onDragStart={(e)=> handleDragStart(e,index)}
            onDragOver={handleDragOver}
            onDrop={(e)=> handleDrop(e,index)}
            className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-md cursor-move hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExerciseForm
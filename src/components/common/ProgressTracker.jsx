import React from 'react'
import {motion} from 'framer-motion'
import SafeIcon from '../../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const {FiCheck,FiCircle,FiLock} = FiIcons

const ProgressTracker = ({currentStage = 0,totalStages = 4}) => {
  const stages = [
    'Challenge 1',
    'Challenge 2', 
    'Challenge 3',
    'Challenge 4'
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
      
      <div className="flex items-center justify-between mb-4">
        {stages.map((stage,index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                index < currentStage
                  ? 'bg-success-500 text-white'
                  : index === currentStage
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
              initial={{scale: 0.8}}
              animate={{scale: 1}}
              transition={{delay: index * 0.1}}
            >
              {index < currentStage ? (
                <SafeIcon icon={FiCheck} className="w-5 h-5" />
              ) : index === currentStage ? (
                <SafeIcon icon={FiCircle} className="w-5 h-5" />
              ) : (
                <SafeIcon icon={FiLock} className="w-5 h-5" />
              )}
            </motion.div>
            <span className={`text-xs text-center ${
              index <= currentStage ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {stage}
            </span>
            {index < stages.length - 1 && (
              <div className={`w-16 h-0.5 mt-2 ${
                index < currentStage ? 'bg-success-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-primary-500 h-2 rounded-full"
          initial={{width: 0}}
          animate={{width: `${(currentStage / totalStages) * 100}%`}}
          transition={{duration: 0.5}}
        />
      </div>
      
      <p className="text-sm text-gray-600 mt-2 text-center">
        {currentStage} of {totalStages} challenges completed
      </p>
    </div>
  )
}

export default ProgressTracker
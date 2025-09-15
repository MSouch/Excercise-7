import React, { useEffect, useState, useCallback } from 'react'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

/**
 * Floating scroll control: provides physical scroll buttons for iframe/fullscreen contexts
 * Behavior:
 *  - Appears after first scroll (or always if in iframe)
 *  - Up button hidden near top, down button hidden near bottom
 *  - Smooth scroll by viewport height (minus some offset)
 *  - Accessible with aria-labels and keyboard activation
 */
const ScrollControl = () => {
  const [isInIframe, setIsInIframe] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    setIsInIframe(window.self !== window.top)
  }, [])

  const updateState = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset
    const vh = window.innerHeight
    const docHeight = document.documentElement.scrollHeight
    const bottomThreshold = docHeight - (scrollY + vh)
    setAtTop(scrollY < 8)
    setAtBottom(bottomThreshold < 8)
  }, [isInIframe])

  useEffect(() => {
    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    return () => {
      window.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [updateState])

  const scrollAmount = () => Math.max(200, window.innerHeight - 120)

  const handleScroll = (direction) => {
    const delta = direction === 'down' ? scrollAmount() : -scrollAmount()
    window.scrollBy({ top: delta, behavior: 'smooth' })
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 z-50 flex flex-col space-y-3 no-print">
      <button
        type="button"
        aria-label="Scroll up"
        disabled={atTop}
        onClick={() => handleScroll('up')}
        className={`p-3 rounded-full shadow-lg border text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          ${atTop ? 'bg-gray-300 cursor-not-allowed border-gray-200' : 'bg-primary-600 hover:bg-primary-700 border-primary-500'}
        `}
      >
        <FiChevronUp className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll down"
        disabled={atBottom}
        onClick={() => handleScroll('down')}
        className={`p-3 rounded-full shadow-lg border text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          ${atBottom ? 'bg-gray-300 cursor-not-allowed border-gray-200' : 'bg-primary-600 hover:bg-primary-700 border-primary-500'}
        `}
      >
        <FiChevronDown className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ScrollControl

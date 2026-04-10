import { createContext, useContext, useRef, useState, useCallback } from 'react'

const ScrollContext = createContext(null)

const ScrollProvider = ({ children }) => {
  const lenisRef = useRef(null)
  const [scrollState, setScrollState] = useState({
    progress: 0,
    currentSection: 0,
    direction: 1,
    velocity: 0,
  })

  const updateScroll = useCallback((state) => {
    setScrollState((prev) => ({ ...prev, ...state }))
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        lenisRef,
        ...scrollState,
        updateScroll,
        scrollTo: (target, options) => lenisRef.current?.scrollTo(target, options),
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

const useScroll = () => {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider')
  return ctx
}

export { ScrollProvider, useScroll }
export default ScrollContext

import { useEffect, useRef } from 'react'

const PageTransition = ({ children }) => {
  const ref = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (ref.current) ref.current.classList.add('page-entered')
    })
  }, [])

  return (
    <div ref={ref} className="page-transition">
      {children}
    </div>
  )
}

export default PageTransition

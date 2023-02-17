import { useEffect, useRef, useState } from 'react'
interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export const useSwipe = (elementRef: RefObject<HTMLElement>, config?: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
  const x = useRef(-1) // number可以不写
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    e.preventDefault()
    x.current = e.touches[0].clientX
  }
  const onTouchMove = (e: TouchEvent) => {
    const newX = e.touches[0].clientX
    const d = newX - x.current
    config?.onTouchMove?.(e)
    if (Math.abs(d) < 3) {
      setDirection('')
    } else if (d > 0) {
      setDirection('right')
    } else {
      setDirection('left')
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }
  useEffect(() => {
    if (!elementRef.current) { return }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchEnd', onTouchEnd)
    return () => {
      if (!elementRef.current) { return }
      elementRef.current.removeEventListener('touchstart', onTouchStart)
      elementRef.current.removeEventListener('touchmove', onTouchMove)
      elementRef.current.removeEventListener('touchEnd', onTouchEnd)
    }
  }, [])
  return { direction }
}

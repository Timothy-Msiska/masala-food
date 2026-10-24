'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AnimatedRevealProps {
  children: React.ReactNode
  effect?: 'fade-up' | 'fade-down' | 'fade-in' | 'fade-scale' | 'fade-left' | 'fade-right'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
  as?: React.ElementType
}

export function AnimatedReveal({
  children,
  effect = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  className = '',
  style = {},
  once = true,
  as: Component = 'div',
}: AnimatedRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // If browser doesn't support IntersectionObserver, reveal immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, once])

  return (
    <Component
      ref={elementRef}
      className={`reveal-wrapper ${effect} ${isVisible ? 'is-visible' : 'is-hidden'} ${className}`}
      style={{
        ...style,
        '--reveal-delay': `${delay}ms`,
        '--reveal-duration': `${duration}ms`,
      } as React.CSSProperties}
    >
      {children}
    </Component>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  delayBase?: number
  staggerInterval?: number
  className?: string
  effect?: 'fade-up' | 'fade-down' | 'fade-in' | 'fade-scale' | 'fade-left' | 'fade-right'
  duration?: number
}

export function StaggerContainer({
  children,
  delayBase = 0,
  staggerInterval = 100,
  className = '',
  effect = 'fade-up',
  duration = 650,
}: StaggerContainerProps) {
  const childArray = React.Children.toArray(children)

  return (
    <div className={`stagger-container ${className}`}>
      {childArray.map((child, index) => (
        <AnimatedReveal
          key={index}
          effect={effect}
          delay={delayBase + index * staggerInterval}
          duration={duration}
        >
          {child}
        </AnimatedReveal>
      ))}
    </div>
  )
}

interface FadeTransitionProps {
  show: boolean
  children: React.ReactNode
  className?: string
  duration?: number
  unmountOnExit?: boolean
}

export function FadeTransition({
  show,
  children,
  className = '',
  duration = 240,
  unmountOnExit = true,
}: FadeTransitionProps) {
  const [shouldRender, setShouldRender] = useState(show)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (show) {
      setShouldRender(true)
      const timer = requestAnimationFrame(() => {
        setIsAnimating(true)
      })
      return () => cancelAnimationFrame(timer)
    } else {
      setIsAnimating(false)
      if (unmountOnExit) {
        const timeout = setTimeout(() => {
          setShouldRender(false)
        }, duration)
        return () => clearTimeout(timeout)
      }
    }
  }, [show, duration, unmountOnExit])

  if (!shouldRender && unmountOnExit) return null

  return (
    <div
      className={`fade-transition-box ${isAnimating ? 'fade-entered' : 'fade-leaving'} ${className}`}
      style={{
        '--fade-dur': `${duration}ms`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

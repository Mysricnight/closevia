import React, { useRef, useCallback } from 'react'

/**
 * Hook to prevent button spam by debouncing rapid clicks
 * @param callback - The function to call
 * @param delayMs - Minimum delay between calls (default: 1000ms)
 * @returns Protected callback function
 */
export const useButtonDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delayMs: number = 1000
) => {
  const lastCallTimeRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // If enough time has passed, call immediately
      if (now - lastCallTimeRef.current >= delayMs) {
        lastCallTimeRef.current = now
        return callback(...args)
      }

      // Otherwise, delay the call
      timeoutRef.current = setTimeout(() => {
        lastCallTimeRef.current = Date.now()
        callback(...args)
      }, delayMs - (now - lastCallTimeRef.current))
    }) as T,
    [callback, delayMs]
  )
}

/**
 * Hook to prevent rapid navigation by debouncing navigate calls
 * @param navigate - React Router navigate function
 * @param delayMs - Minimum delay between navigation (default: 500ms)
 * @returns Protected navigate function
 */
export const useDebouncedNavigate = (
  navigate: (path: string, options?: any) => void,
  delayMs: number = 500
) => {
  const lastNavTimeRef = useRef(0)

  return useCallback(
    (path: string, options?: any) => {
      const now = Date.now()
      
      if (now - lastNavTimeRef.current >= delayMs) {
        lastNavTimeRef.current = now
        navigate(path, options)
      }
    },
    [navigate, delayMs]
  )
}

/**
 * Hook to create a button state handler that manages loading/disabled state
 * Prevents double-submission and provides easy state management
 */
export const useButtonHandler = <T extends (...args: any[]) => Promise<any>>(
  handler: T
) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const isExecutingRef = useRef(false)

  const protectedHandler = useCallback(
    (async (...args: Parameters<T>) => {
      if (isExecutingRef.current || isLoading) {
        return
      }

      isExecutingRef.current = true
      setIsLoading(true)

      try {
        return await handler(...args)
      } finally {
        isExecutingRef.current = false
        setIsLoading(false)
      }
    }) as T,
    [handler, isLoading]
  )

  return { handler: protectedHandler, isLoading }
}

/**
 * Higher-order function to debounce async operations
 * Useful for form submissions, API calls triggered by buttons
 */
export const debounceAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delayMs: number = 1000
): T => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastCallTime = 0

  return ((...args: Parameters<T>) => {
    const now = Date.now()

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (now - lastCallTime >= delayMs) {
      lastCallTime = now
      return fn(...args)
    }

    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now()
        fn(...args).then(resolve)
      }, delayMs - (now - lastCallTime))
    })
  }) as T
}

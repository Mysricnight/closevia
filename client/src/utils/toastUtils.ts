import { UseToastOptions } from '@chakra-ui/react'

// Track recently shown toast IDs with timestamps to prevent duplicates
const recentToasts = new Map<string, number>()
const TOAST_DEBOUNCE_MS = 2000 // Prevent same toast within 2 seconds

/**
 * Debounced toast function to prevent duplicate notifications
 * @param toastFn - The chakra useToast() function
 * @param options - Toast options including id, title, description, etc.
 * @param debounceMs - Debounce time in milliseconds (default: 2000ms)
 */
export const showDebouncedToast = (
  toastFn: ReturnType<any>, // UseToastOptions return type
  options: UseToastOptions,
  debounceMs: number = TOAST_DEBOUNCE_MS
) => {
  const toastId = options.id || `${options.title}-${options.description}`
  const now = Date.now()
  const lastShown = recentToasts.get(toastId)

  // Only allow toast if it hasn't been shown recently
  if (!lastShown || now - lastShown > debounceMs) {
    recentToasts.set(toastId, now)
    
    // Clean up old entries (keep only last 100)
    if (recentToasts.size > 100) {
      const entriesToDelete = recentToasts.size - 50
      for (const [key] of Array.from(recentToasts.entries()).slice(0, entriesToDelete)) {
        recentToasts.delete(key)
      }
    }

    return toastFn(options)
  }
}

/**
 * Clear all tracked toasts (useful on logout or app reset)
 */
export const clearToastHistory = () => {
  recentToasts.clear()
}

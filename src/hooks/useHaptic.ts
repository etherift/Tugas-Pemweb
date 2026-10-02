import { useCallback } from 'react'

export function useHaptic() {
  return useCallback((pattern: number | number[] = 15) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern)
      } catch {
      }
    }
  }, [])
}

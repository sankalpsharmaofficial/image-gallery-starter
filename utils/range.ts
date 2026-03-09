export const range = (start: number, end: number): number[] => {
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  return Array.from({ length: end - start }, (_, i) => start + i)
}

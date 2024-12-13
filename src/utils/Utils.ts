import { getCurrentUser } from 'aws-amplify/auth'

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await getCurrentUser()
    return true
  } catch (error) {
    return false
  }
}

export const formatTime = (currentTime: string) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(currentTime))
}

export function isToday(input: Date): boolean {
  const today = new Date()
  const date = typeof input === 'string' ? new Date(input) : input

  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  const dateDay = date.getDate()
  const dateMonth = date.getMonth()
  const dateYear = date.getFullYear()

  return (
    dateDay === todayDay && dateMonth === todayMonth && dateYear === todayYear
  )
}

export function isTomorrow(input: Date): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const date = typeof input === 'string' ? new Date(input) : input
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  )
}

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`
}
export function validateEmail(email: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email.trim() || !emailRegex.test(email)) {
    return 'Por favor, insira um email válido.'
  }

  return undefined
}
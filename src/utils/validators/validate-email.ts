export function validateEmail(email: string): string | undefined {
  const normalizedEmail = email.trim()

  if (!normalizedEmail) {
    return 'Por favor, insira um email válido.'
  }

  if (normalizedEmail.length > 254) {
    return 'Por favor, insira um email válido.'
  }

  let atCount = 0
  let atIndex = -1

  for (let i = 0; i < normalizedEmail.length; i++) {
    const char = normalizedEmail[i]

    if (char === '@') {
      atCount++
      atIndex = i
    }

    const code = normalizedEmail.charCodeAt(i)
    if (code <= 32 || code === 127) {
      return 'Por favor, insira um email válido.'
    }
  }

  if (atCount !== 1 || atIndex <= 0 || atIndex === normalizedEmail.length - 1) {
    return 'Por favor, insira um email válido.'
  }

  const localPart = normalizedEmail.slice(0, atIndex)
  const domain = normalizedEmail.slice(atIndex + 1)

  if (localPart.length > 64 || localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return 'Por favor, insira um email válido.'
  }

  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) {
    return 'Por favor, insira um email válido.'
  }

  const labels = domain.split('.')

  for (const label of labels) {
    if (!label || label.startsWith('-') || label.endsWith('-')) {
      return 'Por favor, insira um email válido.'
    }

    for (let i = 0; i < label.length; i++) {
      const code = label.charCodeAt(i)
      const isNumber = code >= 48 && code <= 57
      const isUpper = code >= 65 && code <= 90
      const isLower = code >= 97 && code <= 122
      const isHyphen = code === 45

      if (!isNumber && !isUpper && !isLower && !isHyphen) {
        return 'Por favor, insira um email válido.'
      }
    }
  }

  if (labels[labels.length - 1].length < 2) {
    return 'Por favor, insira um email válido.'
  }

  return undefined
}

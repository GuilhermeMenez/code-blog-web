const INVALID_EMAIL_MESSAGE = 'Por favor, insira um email válido.'

function hasInvalidAsciiWhitespaceOrControl(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)
    if (code <= 32 || code === 127) {
      return true
    }
  }

  return false
}

function getSingleAtIndex(value: string): number {
  const atIndex = value.indexOf('@')

  if (atIndex <= 0 || atIndex === value.length - 1) {
    return -1
  }

  return atIndex === value.lastIndexOf('@') ? atIndex : -1
}

function hasInvalidLocalPart(localPart: string): boolean {
  return (
    localPart.length > 64 ||
    localPart.startsWith('.') ||
    localPart.endsWith('.') ||
    localPart.includes('..')
  )
}

function isAllowedDomainLabelChar(code: number): boolean {
  const isNumber = code >= 48 && code <= 57
  const isUpper = code >= 65 && code <= 90
  const isLower = code >= 97 && code <= 122
  const isHyphen = code === 45

  return isNumber || isUpper || isLower || isHyphen
}

function hasInvalidDomainLabel(label: string): boolean {
  if (!label || label.startsWith('-') || label.endsWith('-')) {
    return true
  }

  for (let i = 0; i < label.length; i++) {
    if (!isAllowedDomainLabelChar(label.charCodeAt(i))) {
      return true
    }
  }

  return false
}

function hasInvalidDomain(domain: string): boolean {
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) {
    return true
  }

  const labels = domain.split('.')

  for (const label of labels) {
    if (hasInvalidDomainLabel(label)) {
      return true
    }
  }

  return labels[labels.length - 1].length < 2
}

export function validateEmail(email: string): string | undefined {
  const normalizedEmail = email.trim()

  if (!normalizedEmail) {
    return INVALID_EMAIL_MESSAGE
  }

  if (normalizedEmail.length > 254) {
    return INVALID_EMAIL_MESSAGE
  }

  if (hasInvalidAsciiWhitespaceOrControl(normalizedEmail)) {
    return INVALID_EMAIL_MESSAGE
  }

  const atIndex = getSingleAtIndex(normalizedEmail)
  if (atIndex === -1) {
    return INVALID_EMAIL_MESSAGE
  }

  const localPart = normalizedEmail.slice(0, atIndex)
  const domain = normalizedEmail.slice(atIndex + 1)

  if (hasInvalidLocalPart(localPart)) {
    return INVALID_EMAIL_MESSAGE
  }

  if (hasInvalidDomain(domain)) {
    return INVALID_EMAIL_MESSAGE
  }

  return undefined
}

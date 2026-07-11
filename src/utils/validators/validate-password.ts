export function validateRegisterPassword(password: string): string | undefined {
  if (!password) {
    return 'Por favor, insira sua senha.'
  }

  if (password.length < 8) {
    return 'Senha deve ter no mínimo 8 caracteres.'
  }

  if (!/[A-Z]/.test(password)) {
    return 'Senha deve conter ao menos uma letra maiúscula.'
  }

  if (!/\d/.test(password)) {
    return 'Senha deve conter ao menos um número.'
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Senha deve conter ao menos um caractere especial.'
  }

  return undefined
}

export function validateLoginPassword(password: string): string | undefined {
  if (!password) {
    return 'Por favor, insira uma senha.'
  }
}
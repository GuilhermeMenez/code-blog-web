export function validateName(name: string): string | undefined {
  const nameRegex = /^[\p{L}\s]+$/u

  if (!name.trim() || !nameRegex.test(name)) {
    return 'Por favor, insira um nome válido.'
  }

  return undefined
}
import { useState, type FormEvent } from 'react'
import { useRegister } from "@/hooks/useAuth"
import { twMerge } from "tailwind-merge"
import { isApiError, isUnauthorized } from '@/types/api-error.types'

import { validateName } from '@/utils/validators/validate-name'
import { validateEmail } from '@/utils/validators/validate-email'
import { validateRegisterPassword } from '@/utils/validators/validate-password'

import { Form } from '@base-ui/react'
import { AlertIcon } from '@/assets/icons/AlertIcon'
import { Input } from '@/components/ui/Input'
import { Button } from "@/components/ui/Button"

interface SignUpProps {
  setFormType: (type: 'signIn' | 'signUp') => void
}

type FormErrors = Record<string, string>

export function SignUp({ setFormType }: SignUpProps) {
  const { mutate: register, isPending } = useRegister()
  const [errors, setErrors] = useState<FormErrors>({})

  function validateForm(formValues: { name: string; email: string; password: string }): FormErrors {
    const errors: FormErrors = {}

    const nameError = validateName(formValues.name)
    if (nameError) {
      errors.name = nameError
    }

    const emailError = validateEmail(formValues.email)
    if (emailError) {
      errors.email = emailError
    }

    const passwordError = validateRegisterPassword(formValues.password)
    if (passwordError) {
      errors.password = passwordError
    }

    return errors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // Validação de campos antes da chamada API
    const validationErrors = validateForm(formValues)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    register(formValues, {
      onError: (error) => {
        if (isApiError(error) && isUnauthorized(error)) {
          setErrors({ auth: 'Erro ao validar dados. Tente novamente.' })
          return
        }
        setErrors({ auth: 'Ocorreu um erro. Tente novamente.' })
      },
    })
  }

  return (
    <div className={twMerge('flex flex-col gap-16 py-14', errors.auth ? 'gap-10' : 'gap-14')}>
      <div className="flex flex-col items-center gap-6">
        <img src="src/assets/svgs/logo.svg" alt="Logo Code Blog" className="w-auto h-10" />
        <h2 className="font-source font-light text-2xl">Participe do Code Blog</h2>
      </div>

      <div className="flex flex-col gap-6 items-center">
        {errors.auth && 
          <div className="flex items-center gap-2 px-4 py-2 rounded-sm text-center text-sm text-danger-40 bg-danger-40/5">
            <AlertIcon size="16px" />
            <p className="text-center text-md text-danger-40">{errors.auth}</p> 
          </div>
        }

        {/* TO-DO:
          - Ajustar size de Icons 
          - Revisar alterações       
        */}

        <Form
          className="flex flex-col gap-6 w-full max-w-93"
          errors={errors}
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="name"
            label="Nome"
            placeholder="Insira seu nome"
          />

          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Insira seu email"
            inputMode="email"
            autoComplete="email"
          />

          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Insira sua senha"
          />

          <div className="my-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isPending}
            >
              Cadastrar
            </Button>
          </div>

          <p className="font-inter font-light text-center text-sm text-white-40">
            Já tem uma conta?{' '}
            <span
              className="font-normal text-accent-30 hover:underline cursor-pointer"
              onClick={() => setFormType('signIn')}
            >
              Entrar
            </span>
          </p>
        </Form>
      </div>
    </div>
  )
}

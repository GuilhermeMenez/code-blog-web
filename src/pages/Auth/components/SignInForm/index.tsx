import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import './styles.css'

import IconClose from '@/assets/icons/IconClose'
import { Form } from 'radix-ui'
import { Flex, TextField, Text, Button } from '@radix-ui/themes'

interface SignInProps {
  callback: () => void
}

const SignInForm = ({ callback }: SignInProps) => {
  const { handleSignIn } = useAuth()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSignIn({ login, password })
  }

  return (
    <Flex className="signin-wrapper" direction="column" justify="center" gap="9">
      <Flex direction="column" gap="2">
        <Text className="signin-title" size="8" weight="regular">
          Entre com sua conta
        </Text>

        <Text className="signin-subtitle" size="4" weight="light">
          [subtitle]
        </Text>
      </Flex>

      <Form.Root className="signin-form" onSubmit={onSubmit}>
        <Flex direction="column" gap="6">
          {/* Email */}
          <Form.Field className="signin-field" name="login">
            <Form.Label className="signin-label">Email</Form.Label>

            <Form.Control asChild>
              <TextField.Root
                className="signin-input"
                placeholder="Digite seu email"
                type="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </Form.Control>

            <Form.Message className="signin-error" match="valueMissing">
              <IconClose width="15px" height="15px" />
              O email é obrigatório
            </Form.Message>

            <Form.Message className="signin-error" match="typeMismatch">
              <IconClose width="15px" height="15px" />
              Insira um email válido
            </Form.Message>
          </Form.Field>

          {/* Senha */}
          <Form.Field className="signin-field" name="password">
            <Form.Label className="signin-label">Senha</Form.Label>

            <Form.Control asChild>
              <TextField.Root
                className="signin-input"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Control>

            <Form.Message className="signin-error" match="valueMissing">
              <IconClose width="15px" height="15px" />
              A senha é obrigatória
            </Form.Message>
          </Form.Field>
        </Flex>

        <Flex direction="column" gap="5">
          <Form.Submit asChild>
            <Button className="signin-button" size="3">
              Entrar
            </Button>
          </Form.Submit>

          <Flex gap="2">
            <span className="signin-create-account">Não tem uma conta? </span>
            <Button className="signin-create-button" variant="ghost" onClick={callback}>
              Cadastre-se.
            </Button>
          </Flex>
        </Flex>
      </Form.Root>
    </Flex>
  )
}

export default SignInForm

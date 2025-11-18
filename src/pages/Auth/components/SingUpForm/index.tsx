import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import "./styles.css";

import IconClose from "@/assets/icons/IconClose";

import { Form } from "radix-ui";
import { Flex, TextField, Text, Button } from "@radix-ui/themes";

interface SignUpProps {
  callback: () => void;
}

const SingUpForm = ({ callback }: SignUpProps) => {
  const { handleSignUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignUp({ name, email, password, userRole: "user" });
  };

  return (
    <Flex
      className="signup-wrapper"
      direction="column"
      justify="center"
      gap="8"
    >
      <Flex direction="column" gap="2">
        <Text className="signup-title" size="8" weight="regular">
          Crie uma conta
        </Text>

        <Text className="signup-subtitle" size="4" weight="light">
          [subtitle]
        </Text>
      </Flex>

      <Form.Root className="signup-form" onSubmit={onSubmit}>
        <Flex direction="column" gap="5">
          {/* Nome */}
          <Form.Field className="signup-field" name="name">
            <Form.Label className="signup-label">Nome</Form.Label>

            <Form.Control asChild>
              <TextField.Root
                className="signup-input"
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Control>

            <Form.Message className="signup-error" match="valueMissing">
              <IconClose width="15px" height="15px" color="#f3373dff" />
              O nome é obrigatório.
            </Form.Message>
          </Form.Field>

          {/* Email */}
          <Form.Field className="signup-field" name="email">
            <Form.Label className="signup-label">Email</Form.Label>

            <Form.Control asChild>
              <TextField.Root
                className="signup-input"
                placeholder="Digite seu email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Control>

            <Form.Message className="signup-error" match="valueMissing">
              <IconClose width="15px" height="15px" color="#f3373dff" />
              O email é obrigatório.
            </Form.Message>

            <Form.Message className="signup-error" match="typeMismatch">
              <IconClose width="15px" height="15px" color="#f3373dff" />
              Digite um email válido.
            </Form.Message>
          </Form.Field>

          {/* Senha */}
          <Form.Field className="signup-field" name="password">
            <Form.Label className="signup-label">Senha</Form.Label>

            <Form.Control asChild>
              <TextField.Root
                className="signup-input"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Control>

            <Form.Message className="signup-error" match="valueMissing">
              <IconClose width="15px" height="15px" color="#f3373dff" />
              A senha é obrigatória.
            </Form.Message>
          </Form.Field>
        </Flex>

        <Flex direction="column" gap="5">
          <Form.Submit asChild>
            <Button className="signup-button" size="3">Cadastrar</Button>
          </Form.Submit>

          <Flex gap="2">
            <span className="signup-create-account">Já tem uma conta?{" "}</span>
            <Button className="signin-create-button" variant="ghost" onClick={callback}>
              Entre.
            </Button>
          </Flex>
        </Flex>
      </Form.Root>
    </Flex>
  );
};

export default SingUpForm;

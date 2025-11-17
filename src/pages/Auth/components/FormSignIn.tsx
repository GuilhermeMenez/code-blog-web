import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Form } from "radix-ui";
import { Card, Flex, TextField, Text, Button,  } from "@radix-ui/themes";

interface SignInProps {
  callback: () => void;
}

const SignInPage = ({callback}: SignInProps) => {
  const { handleSignIn } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignIn({ login, password });
  };

  return (
    <Flex justify="center" direction="column" width="460px">
      {/* <Card size="4" style={{ width: "500px" }} variant="ghost" > */}
        <Text size="8" weight="bold">
          Login
        </Text>
          {/* Email */}
        <Form.Root onSubmit={onSubmit}>
          <Flex direction="column" gap="4" mt="4">
            <Form.Field name="login">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  placeholder="Digite seu email"
                  type="email"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                O email é obrigatório
              </Form.Message>
              <Form.Message match="typeMismatch">
                Insira um email válido
              </Form.Message>
            </Form.Field>

           {/* Senha */}
            <Form.Field name="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                A senha é obrigatória
              </Form.Message>
            </Form.Field>
            <Form.Submit asChild>
              <Button size="3">Entrar</Button>  
            </Form.Submit>
          <p>
            Não tem uma conta?{" "}
            <Button variant="surface"  onClick={callback}  >
              Cadastre-se
            </Button>
          </p>
          </Flex>
        </Form.Root>
      {/* </Card> */}
    </Flex>
  );
};

export default SignInPage;

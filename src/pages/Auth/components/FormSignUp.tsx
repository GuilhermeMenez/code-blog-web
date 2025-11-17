import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Form } from "radix-ui";
import { Card, Flex, TextField, Text, Button, Grid } from "@radix-ui/themes";

interface SignUpProps {
  callback: () => void;
}

const SingUpPage = ({ callback }: SignUpProps) => {
  const { handleSignUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp({ name, email, password, userRole: "user" });
  };

  return (
    <Flex justify="center"  direction="column">
      {/* <Card size="4" style={{ width: "500px" }} variant="ghost"> */}
        <Text size="8" weight="bold">
          Cadastro
        </Text>

        <Form.Root onSubmit={onSubmit}>
          <Flex direction="column" gap="4" mt="4">
            {/* Nome */}
            <Form.Field name="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  placeholder="Digite seu nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                O nome é obrigatório.
              </Form.Message>
            </Form.Field>

            {/* Email */}
            <Form.Field name="email">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  placeholder="Digite seu email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                O email é obrigatório.
              </Form.Message>
              <Form.Message match="typeMismatch">
                Digite um email válido.
              </Form.Message>
            </Form.Field>

            {/* Senha */}
            <Form.Field name="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  placeholder="Digite sua senha"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                A senha é obrigatória.
              </Form.Message>
            </Form.Field>
            <Form.Submit asChild>
              <Button>Cadastrar</Button>
            </Form.Submit>
            <Grid columns={"1"} rows={"1"}> 
            <Text>
              Já tem uma conta?{" "}
              <Button  onClick={callback} >
                Entre
              </Button>
            </Text>
          </Grid>
            </Flex>
        </Form.Root>
      {/* </Card> */}
    </Flex>
  );
};

export default SingUpPage;

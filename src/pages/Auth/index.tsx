import { useState } from "react";
import SingUpPage from "./components/FormSignUp";
import SingInPage from "./components/FormSignIn";
import { Card, Flex, Text } from "@radix-ui/themes";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Flex justify="center" align="center" height="100vh">
      <Card size="4">
        <Flex direction="row" align="center" gap="4" width="1326px" >
          <Flex direction="column" style={{ width: '40%' }}>
            <Text size={"9"}>Code Blog</Text>
          </Flex>
          <Flex direction="column" align="center" gap="4" style={{ width: '60%' }}>
            {isLogin ? (
              <SingInPage callback={() => setIsLogin(false)} />
            ) : (
              <SingUpPage callback={() => setIsLogin(true)} />
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AuthPage;

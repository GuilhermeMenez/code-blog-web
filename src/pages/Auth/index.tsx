import { useState } from "react";
import "./styles.css";

import SignInForm from "./components/SignInForm";
import SingUpForm from "./components/SingUpForm";
import { Card, Flex, Text } from "@radix-ui/themes";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Flex className="auth-wrapper" justify="center" align="center">
      <Card className="auth-card" size="3">
        <Flex direction="row" className="auth-content">
          <Flex
            className="auth-landing"
            direction="column"
            justify="end"
          >
            <Flex direction="column" gap="2">
              <Text className="auth-title" weight="regular">
                Code Blog
              </Text>

              <Text className="auth-subtitle" weight="regular">
                [subtitle]
                {/* Compartilhe conhecimento com a comunidade. */}
                {/* Compartilhe <span style={{ textDecoration: " line-through" }}>sexo</span> conhecimento com a comunidade. */}
                {/* Busquem conhecimento */}
              </Text>
            </Flex>
          </Flex>

          <Flex
            className="auth-form"
            direction="column"
            align="center"
            justify="center"
          >
            {isLogin ? (
              <SignInForm callback={() => setIsLogin(false)} />
            ) : (
              <SingUpForm callback={() => setIsLogin(true)} />
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AuthPage;

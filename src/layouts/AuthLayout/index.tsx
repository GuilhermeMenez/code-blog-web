import { Outlet } from 'react-router'
import './styles.css'

import { Flex } from '@radix-ui/themes'

const AuthLayout = () => {
  return (
    <Flex className="auth-container" justify="center" align="center">
      <Outlet />
    </Flex>
  )
}

export default AuthLayout

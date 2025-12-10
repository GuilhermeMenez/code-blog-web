import { useState } from 'react'
import { Outlet } from 'react-router'
import './styles.css'

import Navigation from '@/components/Navigation'
import Header from '@/components/Header'

import { Flex, Container } from '@radix-ui/themes'

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <Flex className="main-container" direction="row">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Flex className={`main-content ${!isMenuOpen ? 'menu-off' : ''}`} direction="column">
        <Header isMenuOpen={isMenuOpen} />

        <Container size="3" py="5">
          <Outlet />
        </Container>
      </Flex>
    </Flex>
  )
}

export default MainLayout

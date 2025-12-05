import { NavLink } from 'react-router-dom'
import './styles.css'

import IconHamburguer from '@/assets/icons/IconHamburger'
import IconLogo from '@/assets/icons/Logo'
import IconHome from '@/assets/icons/IconHome'
import IconProfile from '@/assets/icons/IconProfile'
import IconFav from '@/assets/icons/IconFav'
import { Flex, Box, Text, Button } from '@radix-ui/themes'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

const Navigation = ({ isMenuOpen, setIsMenuOpen }: NavigationProps) => {
  const navigationItems = [
    { to: '/feed', label: 'Feed', Icon: IconHome, IconWidth: 21, IconHeight: 21 },
    { to: '/profile', label: 'Perfil', Icon: IconProfile, IconWidth: 19, IconHeight: 19 },
    { to: '/favorites', label: 'Favoritos', Icon: IconFav, IconWidth: 21, IconHeight: 21 },
  ]

  return (
    <>
      <Flex
        className={`logo-header ${!isMenuOpen ? 'menu-off' : ''}`}
        justify="between"
        align="center"
      >
        <Flex align="center" gap="4">
          <Box
            className={`hamburger-menu logo-btn-hamburger ${!isMenuOpen ? 'menu-on' : ''}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <IconHamburguer width={24} height={24} />
          </Box>

          <NavLink className={`link-logo ${!isMenuOpen ? 'menu-off' : ''}`} to="/feed">
            <IconLogo width={122} height={38} />
          </NavLink>
        </Flex>

        <Box
          className={`hamburger-menu btn-hamburger ${!isMenuOpen ? 'menu-off' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <IconHamburguer width={24} height={24} />
        </Box>
      </Flex>

      <Flex
        className={`navigation-box ${!isMenuOpen ? 'menu-off' : ''}`}
        direction="column"
        gap="6"
        px="2"
        py="5"
      >
        <Flex direction="column" gap="3">
          {navigationItems.map(({ to, label, Icon, IconWidth, IconHeight }) => (
            <Button key={to} asChild className="navigation-button" variant="ghost" color="gray">
              <NavLink to={to} end>
                {({ isActive }) => (
                  <div className={isActive ? 'navigation-item active' : 'navigation-item'}>
                    {isActive && <Box className="active-item" />}

                    <Flex justify="center" align="center" width="26px" height="26px">
                      <Icon width={IconWidth} height={IconHeight} />
                    </Flex>

                    <Text size="3">{label}</Text>
                  </div>
                )}
              </NavLink>
            </Button>
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export default Navigation

import './styles.css'

import IconNewPost from '@/assets/icons/IconNewPost'
// import IconSearch from '@/assets/icons/IconSearch'
import IconBell from '@/assets/icons/IconBell'
import AvatarUser from '@/components/AvatarUser'
import { Flex, Text, Box } from '@radix-ui/themes'

interface HeaderProps {
  isMenuOpen: boolean
}

const Header = ({ isMenuOpen }: HeaderProps) => {
  return (
    <Flex
      className={`main-header ${!isMenuOpen ? 'menu-off' : ''}`}
      justify="end"
      align="center"
      gap="8"
    >
      {/* <SearchBar /> */}

      <Flex gap="5">
        <Flex className="header-item" justify="center" align="center" gap="1">
          <Box className="icon-box">
            <IconNewPost width={20} height={20} />
          </Box>

          <Text size="2">Novo Post</Text>
        </Flex>

        <Flex gap="3">
          {/* <Flex className="header-item" justify="center" align="center">
            <Box className="icon-box">
              <IconSearch width={20} height={20} />
            </Box>
          </Flex> */}

          <Flex className="header-item" justify="center" align="center">
            <Box className="notifier-pin" />

            <Box className="icon-box">
              <IconBell width={20} height={22} />
            </Box>
          </Flex>

          <Box pl="2">
            <AvatarUser
              // src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              letter="CB"
              size="medium"
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header

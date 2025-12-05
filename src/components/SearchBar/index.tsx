import "./styles.css"

import IconSearch from '@/assets/icons/IconSearch'
import { Flex, TextField } from '@radix-ui/themes'

const SearchBar = () => {
  return (
    <Flex className="search-box" flexGrow="1" align="center">
      <TextField.Root
        className="search-bar"
        variant="soft"
        radius="large"
        placeholder="Pesqusiar..."
      >
        <TextField.Slot className="search-icon">
          <IconSearch width="18" height="18" />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  )
}

export default SearchBar

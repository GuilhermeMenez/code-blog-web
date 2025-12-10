import './styles.css'
import { Avatar, Box } from '@radix-ui/themes'

interface AvatarProps {
  src?: string
  letter: string
  size: 'small' | 'medium' | 'large'
  alt?: string
}

enum AvatarSize {
  small = '1',
  medium = '3',
  large = '9',
}

const AvatarUser = ({ src, letter, size }: AvatarProps) => {
  return (
    <Box position="relative">
      <Avatar
        src={src}
        fallback={letter.toUpperCase()}
        size={size ? AvatarSize[size] : AvatarSize.medium}
        radius="full"
      />

      <Box className="avatar-hover" />
    </Box>
  )
}

export default AvatarUser

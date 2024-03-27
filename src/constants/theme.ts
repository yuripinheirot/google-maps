import { defineStyleConfig, extendTheme } from '@chakra-ui/react'

const Button = defineStyleConfig({
  variants: {
    primary: {
      color: '#fff',
      bg: '#1E1E1E',
    },
    secondary: {
      color: '#fff',
      bg: '#F0C419',
    },
    unselected: {
      color: '#696969',
      bg: '#E4E4E4',
    },
  },
  defaultProps: {
    variant: 'primary',
  },
})

export const theme = extendTheme({
  components: {
    Button,
  },
})

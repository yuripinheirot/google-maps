import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { theme } from '../constants/theme'

export const Contexts = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  )
}

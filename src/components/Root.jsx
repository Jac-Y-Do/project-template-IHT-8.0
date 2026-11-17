import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Box, Flex } from '@chakra-ui/react'
import { Footer } from './Footer'
import { Toaster } from './ui/toaster'

export const Root = () => {
  return (
    <Flex direction='column' minHeight='100vh'>
      <Navigation />
      <Box flex='1'>
        <Outlet />
      </Box>

      <Footer />
      <Toaster />
    </Flex>
  )
}

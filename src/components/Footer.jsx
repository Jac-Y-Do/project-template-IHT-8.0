import { Box, Container, Image, Text, VStack } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <>
      <Box
        bg='#535448'
        color='white'
        shadow='sm'
        marginTop={30}
        paddingTop={3}
        paddingBottom={3}
        width='100%'
      >
        <Container align='center'>
          <VStack>
            <Image
              src='https://ihavetickets.nl/IHT_70_img/logo_webshop.png'
              alt='I Have Tickets'
              w='auto'
              h='50px'
            />
            <Text>Version 8.0</Text>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

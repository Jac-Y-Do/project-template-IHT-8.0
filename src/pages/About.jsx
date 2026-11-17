import { Heading, Text, Box } from '@chakra-ui/react'
import ImageCarousel from '../components/ImageCarousel'
import '../components/ImageCarousel.css'
export const About = () => {
  return (
    <>
      <Box
        position='relative'
        width='100%'
        margin='auto'
        overflow='hidden'
        backgroundColor='#dadad4'
      >
        <ImageCarousel />
      </Box>
      <Box margin={10}>
        <Heading>About I Have Tickets</Heading>
        <Text>coming soon...</Text>
      </Box>
    </>
  )
}

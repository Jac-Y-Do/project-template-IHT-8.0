import { useLoaderData } from 'react-router-dom'
import {
  Stack,
  Text,
  Heading,
  Image,
  Box,
  SimpleGrid,
  HStack,
  Button
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { EventContext } from '../context/EventContext'
import EditEventForm from '../components/EditEventForm'
import DeleteEventForm from '../components/DeleteEventForm'
import { useNavigate } from 'react-router-dom'

export const loader = async ({ params }) => {
  try {
    const event = await fetch(`http://localhost:3000/events/${params.eventId}`)

    if (!event.ok) {
      throw new Error('Could not fetch event!')
    }

    return {
      event: await event.json()
    }
  } catch (error) {
    console.error('Error fetching event:', error)
    throw new Response('Event not found', { status: 404 })
  }
}

const convertDateTime = date => {
  const d = new Date(date)
  const dag = String(d.getDate()).padStart(2, '0')
  const maand = String(d.getMonth() + 1).padStart(2, '0')
  const jaar = d.getFullYear()
  const uur = String(d.getHours()).padStart(2, '0')
  const minuut = String(d.getMinutes()).padStart(2, '0')
  return `${dag} / ${maand} / ${jaar}  ${uur}:${minuut}`
}

export const EventPage = () => {
  const { event } = useLoaderData()
  const [modalOpen, setModalOpen] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  const { categories } = useContext(EventContext)
  const navigate = useNavigate()
  return (
    <>
      <Box
        position='relative'
        width='100%'
        margin='auto'
        overflow='hidden'
        backgroundColor='#dadad4'
      >
        <Image
          src={event.image}
          w='100%'
          objectFit='cover'
          aspectRatio={{ base: 16 / 9 }}
          maxH={{ base: 300, sm: 300, lg: 400, xl: 500 }}
          filter='sepia(1) opacity(0.4)'
        />
        <Heading
          position='absolute'
          top={{ base: 100, sm: 100, lg: 150, xl: 200 }}
          left='50%'
          transform='translate(-50%, -50%)'
          size={{ base: 'md', lg: 'lg' }}
          style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}
          textShadow='2px 2px 4px rgba(255, 255, 255, 0.7)'
          color='black'
          textAlign='center'
        >
          {event.title}
        </Heading>
        <Text
          position='absolute'
          top={{ base: 170, sm: 170, lg: 230, xl: 300 }}
          left='50%'
          transform='translate(-50%, -50%)'
          textShadow='2px 2px 2px rgba(255, 255, 255, 0.7)'
          color='black'
          style={{ fontSize: 'clamp(0.4rem, 4vw, 2rem)' }}
          size={{ base: 'lg', lg: '2xl' }}
        >
          {event.description}
        </Text>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 2, lg: 2 }}
        gap={{ base: 4, md: 6 }}
        paddingTop='16px'
        paddingBottom={16}
        maxW='1440px'
        marginX='auto'
        backgroundColor='#ffffff'
      >
        <Box margin={10}>
          <Stack flex='1' gap={{ base: 2 }}>
            <Heading fontSize={{ base: '2xl', md: '2xl' }}>
              {event.title}
            </Heading>
            <Heading fontSize={{ base: 'xl', md: 'xl' }}>Location:</Heading>
            <Text>{event.location}</Text>
            <Text>{event.country}</Text>
            <Heading fontSize={{ base: 'xl', md: 'xl' }}>Category:</Heading>
            <HStack>
              {event.categoryIds.map(item => {
                const gevondenCategorie = categories.find(
                  cat => cat.id === item
                )

                return gevondenCategorie ? (
                  <Text key={gevondenCategorie.id}>
                    {gevondenCategorie.name}
                  </Text>
                ) : null
              })}
            </HStack>
            <Heading
              size={{ base: 'md', lg: 'lg' }}
              fontSize={{ base: 'xl', md: 'xl' }}
            >
              Date & Time
            </Heading>
            <Text>
              Start:
              {convertDateTime(event.startTime)}
            </Text>
            <Text>End: {convertDateTime(event.endTime)}</Text>
            <HStack>
              <Button
                onClick={() => navigate('/')}
                color='white'
                backgroundColor='#535448'
                _hover={{ bg: '#dadad4', color: 'black' }}
                borderRadius={4}
              >
                Back
              </Button>
              <Button
                onClick={() => setModalOpen(true)}
                color='white'
                backgroundColor='#535448'
                _hover={{ bg: '#dadad4', color: 'black' }}
                borderRadius={4}
              >
                Edit Event
              </Button>

              <Button
                onClick={() => setModal2Open(true)}
                color='white'
                backgroundColor='#ff0000'
                _hover={{ bg: '#ff9999', color: 'black' }}
                borderRadius={4}
              >
                Delete Event
              </Button>
            </HStack>
          </Stack>
        </Box>
        <Box margin={10}>
          <Image
            src={event.image}
            w='100%'
            h='auto'
            objectFit='cover'
            border='1px solid #535448'
            borderRadius='xl'
          />
          <Stack flex='1' gap={{ base: 2 }}></Stack>
        </Box>
      </SimpleGrid>

      <EditEventForm
        modalOpen={modalOpen}
        cancel={() => setModalOpen(false)}
        finish={() => setModalOpen(false)}
        categories={categories}
        event={event}
      />
      <DeleteEventForm
        modalOpen={modal2Open}
        cancel={() => setModal2Open(false)}
        finish={() => setModal2Open(false)}
        event={event}
      />
    </>
  )
}

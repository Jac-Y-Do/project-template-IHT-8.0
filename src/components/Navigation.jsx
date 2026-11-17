import {
  Box,
  Flex,
  Container,
  Spacer,
  HStack,
  Image,
  Link
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { EventContext } from '../context/EventContext'
import AddEventForm from './AddEventForm'

export const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { categories } = useContext(EventContext)
  return (
    <>
      <nav>
        <Box
          as='header'
          bg='black'
          color='#F8F6E8'
          position='sticky'
          top={0}
          zIndex='sticky'
          shadow='sm'
        >
          <Container>
            <Flex gap={2} h={16} align='center' marginX='auto'>
              <Image
                src='https://ihavetickets.nl/IHT_70_img/IHTlogo.webp'
                alt='I Have Tickets'
                w='50px'
                h='50px'
              />

              <Spacer />
              <HStack spacing={8} align='center'>
                <Link
                  href='/'
                  color='white'
                  backgroundColor='#535448'
                  _hover={{ bg: '#dadad4', color: 'black' }}
                  padding={(3, 2)}
                  borderRadius={4}
                >
                  Events
                </Link>
                <Link
                  onClick={() => setModalOpen(true)}
                  color='white'
                  backgroundColor='#535448'
                  _hover={{ bg: '#dadad4', color: 'black' }}
                  padding={(3, 2)}
                  borderRadius={4}
                >
                  Add Event
                </Link>
                <Link
                  href='/about'
                  color='white'
                  backgroundColor='#535448'
                  _hover={{ bg: '#dadad4', color: 'black' }}
                  padding={(3, 2)}
                  borderRadius={4}
                >
                  About
                </Link>
              </HStack>
            </Flex>
          </Container>
        </Box>
      </nav>

      <AddEventForm
        modalOpen={modalOpen}
        cancel={() => setModalOpen(false)}
        finish={() => setModalOpen(false)}
        categories={categories}
      />

      {/*
      <Dialog.Root open={modalOpen} onOpenChange={e => setModalOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>New Event</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Button
                onClick={() => setModalOpen(false)}
                color='white'
                backgroundColor='#535448'
                _hover={{ bg: '#dadad4', color: 'black' }}
              >
                Cancel
              </Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      */}
    </>
  )
}

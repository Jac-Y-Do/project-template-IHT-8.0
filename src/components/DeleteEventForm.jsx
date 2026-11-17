import { Dialog, Button, VStack, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventContext } from '../context/EventContext'
import { toaster } from './ui/toaster'
const convertDateTime = date => {
  const d = new Date(date)
  const dag = String(d.getDate()).padStart(2, '0')
  const maand = String(d.getMonth() + 1).padStart(2, '0')
  const jaar = d.getFullYear()
  const uur = String(d.getHours()).padStart(2, '0')
  const minuut = String(d.getMinutes()).padStart(2, '0')
  return `${dag} / ${maand} / ${jaar}  ${uur}:${minuut}`
}

export default function DeleteEventForm ({ modalOpen, event, cancel, finish }) {
  const { fetchData } = useContext(EventContext)
  const navigate = useNavigate()

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Could not delete event')
      }
      await fetchData()
      toaster.create({
        title: 'Success',
        description: 'Event successful deleted',
        type: 'success'
      })
      finish()
      navigate('/')
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: error.message,
        type: 'error'
      })
    }
  }

  return (
    <Dialog.Root
      open={modalOpen}
      onOpenChange={details => {
        if (!details.open) cancel()
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title color='#ff0000' fontSize={24}>
              ARE YOU SURE YOU WANT TO DELETE: <br />
              <Text fontSize={32} textAlign='center'>
                {event.title}
              </Text>
              <Text fontSize={14} textAlign='center'>
                (This action cannot be undone.)
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text>{event.title}</Text>

            <Text>{event.location}</Text>

            <Text>{convertDateTime(event.startTime)}</Text>

            <Text>{convertDateTime(event.endTime)}</Text>
          </Dialog.Body>

          <form onSubmit={onSubmit}>
            <Dialog.Footer>
              <VStack width='100%' spacing={3} justifyContent='space-around'>
                <Button
                  type='button'
                  onClick={cancel}
                  color='white'
                  backgroundColor='#535448'
                  _hover={{ bg: '#dadad4', color: 'black' }}
                  width='100%'
                >
                  Cancel
                </Button>

                <Button
                  type='submit'
                  color='white'
                  backgroundColor='#ff0000'
                  _hover={{ bg: '#ff9999', color: 'black' }}
                  width='100%'
                >
                  Delete
                </Button>
              </VStack>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

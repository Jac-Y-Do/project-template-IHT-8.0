import { useForm } from 'react-hook-form'
import {
  Dialog,
  Input,
  Button,
  Textarea,
  VStack,
  Field,
  CheckboxCard,
  Flex,
  Text
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { EventContext } from '../context/EventContext'
import { toaster } from './ui/toaster'

export default function AddEventForm ({
  modalOpen,
  event,
  cancel,
  finish,
  categories
}) {
  const { fetchData } = useContext(EventContext)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async data => {
    if (selectedCategoryIds.length === 0) {
      toaster.create({
        title: 'Missing category',
        description: 'Please select at least one category',
        type: 'warning'
      })
      return
    }
    if (
      new Date(data.startTime).getTime() >= new Date(data.endTime).getTime()
    ) {
      toaster.create({
        title: 'Wrong start and end times',
        description: 'The end time must be after the start time',
        type: 'warning'
      })
      return
    }

    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: data.image,
          categoryIds: selectedCategoryIds,
          location: data.location,
          startTime: data.startTime,
          endTime: data.endTime
        })
      })
      if (!response.ok) {
        throw new Error('Could not create event')
      }
      await fetchData()
      toaster.create({
        title: 'Success',
        description: 'Event successful added',
        type: 'success'
      })
      finish()
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: error.message,
        type: 'error'
      })
    }
  }

  const handleCategoryChange = categoryId => {
    setSelectedCategoryIds(currentIds => {
      if (currentIds.includes(categoryId)) {
        return currentIds.filter(id => id !== categoryId)
      }

      return [...currentIds, categoryId]
    })
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={cancel}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          width='100%'
          maxW={{ base: '92vw', md: 'lg' }}
          maxH='90vh'
          overflowY='auto'
          p={{ base: 4, md: 6 }}
        >
          <Dialog.Header>
            <Dialog.Title>New Event: {event?.name}</Dialog.Title>
          </Dialog.Header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Body>
              <Field.Root invalid={errors.title} mt={4}>
                <Field.Label>Name</Field.Label>
                <Input
                  type='text'
                  placeholder='Name of the event'
                  {...register('title', {
                    required: 'Name is mandatory'
                  })}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  placeholder='Describe the event...'
                  {...register('description', {
                    required: 'Description is mandatory'
                  })}
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
              <Text>Select a category</Text>
              <Flex gap='2' wrap='wrap'>
                {categories.map(item => (
                  <CheckboxCard.Root
                    key={item.id}
                    invalid={errors.categoryIds}
                    mt={2}
                    value={item.id}
                    checked={selectedCategoryIds.includes(item.id)}
                    width={{ base: '100%', sm: 'auto' }}
                    onCheckedChange={details =>
                      handleCategoryChange(item.id, details.checked)
                    }
                  >
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                      <CheckboxCard.Content>
                        <CheckboxCard.Label>{item.name}</CheckboxCard.Label>
                      </CheckboxCard.Content>
                      <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                  </CheckboxCard.Root>
                ))}
              </Flex>

              <Field.Root invalid={errors.image} mt={4}>
                <Field.Label>Image</Field.Label>
                <Input
                  placeholder='Image URL'
                  type='text'
                  {...register('image', {
                    required: 'Image URL is mandatory'
                  })}
                />
                <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  type='text'
                  placeholder='Location of the event'
                  {...register('location', {
                    required: 'Location is mandatory'
                  })}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.startTime} mt={4}>
                <Field.Label>Start Date</Field.Label>
                <Input
                  type='datetime-local'
                  placeholder='Start of the event'
                  {...register('startTime', {
                    required: 'Start is mandatory'
                  })}
                />
                <Field.ErrorText>{errors.startTime?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.endTime} mt={4}>
                <Field.Label>End Date</Field.Label>
                <Input
                  type='datetime-local'
                  placeholder='End of the event'
                  {...register('endTime', {
                    required: 'End is mandatory'
                  })}
                />
                <Field.ErrorText>{errors.endTime?.message}</Field.ErrorText>
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer>
              <VStack width='100%' spacing={3} justifyContent='space-around'>
                <Button
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
                  backgroundColor='#535448'
                  _hover={{ bg: '#dadad4', color: 'black' }}
                  width='100%'
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </VStack>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

import { Card, Image, Box, Stack, Heading, Text } from '@chakra-ui/react'

const convertDateTime = date => {
  const d = new Date(date)
  const dag = String(d.getDate()).padStart(2, '0')
  const maand = String(d.getMonth() + 1).padStart(2, '0')
  const jaar = d.getFullYear()
  const uur = String(d.getHours()).padStart(2, '0')
  const minuut = String(d.getMinutes()).padStart(2, '0')
  return `${dag} / ${maand} / ${jaar}  ${uur}:${minuut}`
}

export const EventCard = ({ event, categories, navigate }) => {
  return (
    <Card.Root
      onClick={() => navigate(`/event/${event.id}`)}
      key={event.id}
      borderRadius='xl'
      h='auto'
      maxW={{ base: '100%', md: '300px', lg: '300px' }}
      cursor='pointer'
      transition='transform 0.15s ease'
      shadow='md'
      backgroundColor='white'
      color='black'
      _hover={{
        transform: 'scale(1.01)'
      }}
    >
      <Card.Body display='flex' flexDirection='column'>
        <Box
          aspectRatio={{ base: 16 / 9, md: 4 / 3 }}
          overflow='hidden'
          borderRadius='lg'
          transition='transform 0.15s ease'
        >
          <Image
            src={event.image}
            // width="100%"
            height='100%'
            objectFit='cover'
            aspectRatio={{ base: 16 / 9, sm: 16 / 9 }}
          />
        </Box>
        <Stack mt={{ base: 4, md: 6 }} gap={{ base: 2, md: 3 }}>
          <Heading size={{ base: 'md', md: 'lg' }}>{event.title}</Heading>
          Category:
          {event.categoryIds.map(item => {
            const gevondenCategorie = categories.find(cat => cat.id === item)

            return gevondenCategorie ? (
              <Text key={gevondenCategorie.id}>{gevondenCategorie.name}</Text>
            ) : null
          })}
          <Text>Start: {convertDateTime(event.startTime)}</Text>
          <Text>End: {convertDateTime(event.endTime)}</Text>
          <Text>Location: {event.location}</Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

import { EventContext } from '../context/EventContext'
import {
  Box,
  Text,
  SimpleGrid,
  InputGroup,
  Input,
  Container,
  Checkbox,
  HStack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { EventCard } from '../components/EventCard'
import { MdSearch } from 'react-icons/md'
import ImageCarousel from '../components/ImageCarousel'
import '../components/ImageCarousel.css'
import EventSkeleton from '../components/EventSkeleton'

export const EventsPage = () => {
  const { events, categories, loading, error } = useContext(EventContext)
  const navigate = useNavigate()

  const [eventList, setEventList] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  useEffect(() => {
    setEventList(events)
  }, [events])

  const handleCategoryChange = (categoryId, checked) => {
    setSelectedCategoryIds(currentIds => {
      const newIds = checked
        ? [...currentIds, categoryId]
        : currentIds.filter(id => id !== categoryId)

      handleCategoryFilter(newIds)
      return newIds
    })
  }

  const handleCategoryFilter = categoryIds => {
    const filteredItems = events.filter(event => {
      return (
        categoryIds.length === 0 ||
        event.categoryIds.some(id => categoryIds.includes(id))
      )
    })

    setEventList(filteredItems)
  }

  const handleInputChange = e => {
    // get the value of the search
    const searchTerm = e.target.value
    // set the searchItem state
    setSearchItem(searchTerm)

    // no entry -> show all recipes
    if (!searchTerm.trim()) {
      setEventList(events)
      return
    }

    const filteredItems = events.filter(event => {
      const searchTitle = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const searchDescription = event.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const searchLocation = event.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const searchStart = event.startTime
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const searchEnd = event.endTime
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const searchCategory = event.categoryIds.some(categoryId => {
        const category = categories.find(category => category.id === categoryId)

        return category?.name.toLowerCase().includes(searchTerm.toLowerCase())
      })

      return (
        searchTitle ||
        searchDescription ||
        searchLocation ||
        searchStart ||
        searchEnd ||
        searchCategory
      )
    })
    // update the recipes
    setEventList(filteredItems)
  }

  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

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

        <Text
          position='absolute'
          top={{ base: 100, sm: 100, lg: 150, xl: 200 }}
          left='50%'
          transform='translate(-50%, -50%)'
          textShadow='2px 2px 2px rgba(255, 255, 255, 0.7)'
          color='black'
          style={{ fontSize: 'clamp(0.4rem, 4vw, 2rem)' }}
          size={{ base: 'lg', lg: '2xl' }}
        >
          Search your event here...
        </Text>

        <InputGroup
          position='absolute'
          top={{ base: 150, sm: 150, lg: 200, xl: 250 }}
          left='50%'
          width={{ base: '70%', md: '50%', lg: '40%' }}
          transform='translate(-50%, -50%)'
          flex='1'
          css={{ color: 'white' }}
          startElement={<MdSearch />}
        >
          <Input
            placeholder='search...'
            _placeholder={{ color: 'white' }}
            backgroundColor='white'
            color='black'
            onChange={handleInputChange}
            name='myInput'
            value={searchItem}
            borderColor={'#535448'}
            borderRadius='lg'
            h={11}
          />
        </InputGroup>
      </Box>

      <HStack m={4}>
        <Text>Select a category:</Text>
        {categories.map(category => (
          <Checkbox.Root
            key={category.id}
            checked={selectedCategoryIds.includes(category.id)}
            onCheckedChange={details =>
              handleCategoryChange(category.id, details.checked)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{category.name}</Checkbox.Label>
          </Checkbox.Root>
        ))}
      </HStack>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap={6}
        minChildWidth='250px'
        paddingTop={6}
        paddingLeft={6}
        paddingRight={6}
      >
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <EventSkeleton key={i} />)
          : eventList.map(e => (
              <EventCard
                key={e.id}
                event={e}
                categories={categories}
                navigate={navigate}
              />
            ))}
      </SimpleGrid>

      {error && <Text color='red.500'>{error}</Text>}
      {eventList.length === 0 && (
        <Container centerContent fontSize={{ base: '3xl' }}>
          No events found...
        </Container>
      )}
    </>
  )
}

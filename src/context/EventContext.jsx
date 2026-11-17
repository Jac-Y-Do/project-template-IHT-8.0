import { createContext, useState, useEffect } from 'react'

export const EventContext = createContext(null)

export function EventProvider ({ children }) {
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [usersRes, eventsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:3000/users'),
        fetch('http://localhost:3000/events'),
        fetch('http://localhost:3000/categories')
      ])

      if (!usersRes.ok) {
        throw new Error('Could not fetch users!')
      }
      if (!eventsRes.ok) {
        throw new Error('Could not fetch events!')
      }
      if (!categoriesRes.ok) {
        throw new Error('Could not fetch categories!')
      }

      const [users, events, categories] = await Promise.all([
        usersRes.json(),
        eventsRes.json(),
        categoriesRes.json()
      ])

      setEvents(events)
      setCategories(categories)
      setUsers(users)
    } catch (err) {
      setError(`Could not fetch data: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <EventContext.Provider
      value={{
        events,
        categories,
        loading,
        users,
        error,
        fetchData
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

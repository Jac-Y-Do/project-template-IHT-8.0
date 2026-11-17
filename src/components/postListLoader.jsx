import { useLoaderData, Link } from 'react-router-dom'

export const loader = async () => {
  const events = await fetch('http://localhost:3000/events')

  return { events: await events.json() }
}

export const PostListLoader = () => {
  const { events } = useLoaderData()

  return (
    <>
      <h1>Events</h1>
      {events.map(event => (
        <div key={event.id}>
          <Link to={`event/${event.id}`}>
            <h2>{event.title}</h2>
          </Link>
          <p>
            {event.description.slice(0, 24)}
            {event.description.length > 24 ? '...' : ''}
          </p>
        </div>
      ))}
    </>
  )
}

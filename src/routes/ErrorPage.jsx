import { useRouteError } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  return (
    <>
      <h1>{error.status}</h1>
      <p>Asteroid doesn't exist silly!</p>
    </>
  )
}
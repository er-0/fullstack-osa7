import { useParams } from 'react-router-dom'

export const User = ({ users }) => {
  if (!users)
    return null
  const id = useParams().id
  const user = users.find(n => n.id === id)
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div>{user.blogs.map(b => <li key={b.id}>{b.title}</li>)}</div>
    </div>
  )
}
import { Link } from 'react-router-dom'

export const Userlist = ({ users }) => {
  if (users)
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead><tr><th></th><th>blogs created</th></tr></thead>
          <tbody>
            {users
              .map((user) =>
                <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td></tr>)
            }
          </tbody>
        </table>
      </div>
    )
}
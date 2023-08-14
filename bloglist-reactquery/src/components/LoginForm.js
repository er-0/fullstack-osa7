import { useState } from 'react'

const LoginForm = ({ logIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginEvent = async (event) => {
    event.preventDefault()
    logIn(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h3>log in to application</h3>
      <form onSubmit={loginEvent}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

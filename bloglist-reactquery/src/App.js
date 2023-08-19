import { useEffect, useRef, useContext } from 'react'
import Notification from './components/notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogView from './components/BlogView'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import { getUsers } from './services/users'
import { Userlist } from './components/Userlist'
import { User } from './components/User'
import { Routes, Route, Link, useMatch } from 'react-router-dom'


const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const [notif, notifDispatch] = useContext(NotificationContext)

  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const blogresult = useQuery('blogs', blogService.getAll)
  const blogs = blogresult.data

  const handleMessage = (message, status) => {
    notifDispatch({ type: 'TEXT', payload: {  message, status } })
    setTimeout(() => {
      notifDispatch({ type: 'RESET' })
    }, 5000)
  }

  const logIn = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
      handleMessage('Login successful', 'success')
    } catch (exception) {
      handleMessage('Wrong username or password', 'error')
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
    handleMessage('Logout successful', 'success')
  }

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await newBlogMutation.mutateAsync(blog)
      handleMessage(
        `a new blog ${blog.title} by ${blog.author} added`,
        'success'
      )
    } catch (error) {
      handleMessage('Something went wrong, check form for errors', 'error')
    }
  }

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const addLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlogMutation.mutate(updatedBlog)
  }

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        deleteBlogMutation.mutate(blog.id)
        handleMessage('Blog deleted', 'success')
      } catch (error) {
        handleMessage('Something went wrong', 'error')
      }
    }
  }

  const showBlogs = () => {
    if (user)
      return (
        <div>
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />}
                </Link>
              </div>
            ))}
        </div>
      )
    else return null
  }

  const usersresult = useQuery('users', getUsers)
  const users = usersresult.data

  const showHeader = () => (
    <div>
      <h1>blogs</h1>
      {user.name} logged in <button onClick={handleLogOut}>log out</button>
    </div>
  )

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id) //works unless you refresh
    : null

  if ( blogresult.isLoading ) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <Notification notif={notif} />
      {!user && <LoginForm logIn={logIn} />}
      {user && showHeader()}
      <br />
      <Routes>
        <Route path="/users" element={<Userlist users={users} />} />
        <Route path="/" element={showBlogs()} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={
          <BlogView
            user={user}
            blog={blog}
            deleteBlog={() => deleteBlog(blog)}
            addLike={() => addLike(blog)} />
        }/>
      </Routes>
    </div>
  )
}

export default App

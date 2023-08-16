import { useState, useEffect, useRef, useContext } from 'react'
import Notification from './components/notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import NotificationContext from './NotificationContext'

const App = () => {
  const [user, setUser] = useState(null)
  const [notif, dispatch] = useContext(NotificationContext)

  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const result = useQuery('blogs', blogService.getAll)

  const blogs = result.data

  const handleMessage = (message, status) => {
    dispatch({ type: 'TEXT', payload: {  message, status } })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
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
      setUser(user)
      handleMessage('Login successful', 'success')
    } catch (exception) {
      handleMessage('Wrong username or password', 'error')
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
    return (
      <div>
        <br />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              deleteBlog={() => deleteBlog(blog)}
              addLike={() => addLike(blog)}
            />
          ))}
      </div>
    )
  }

  const showHeader = () => (
    <div>
      <h1>blogs</h1>
      {user.name} logged in <button onClick={handleLogOut}>log out</button>
    </div>
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <Notification notif={notif} />
      {!user && <LoginForm logIn={logIn} />}
      {user && showHeader()}
      <br />
      {user && (
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}
      {user && showBlogs()}
    </div>
  )
}

export default App

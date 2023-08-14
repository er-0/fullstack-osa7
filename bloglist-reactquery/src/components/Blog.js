import { useState } from 'react'

const Blog = ({ user, blog, deleteBlog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title}, {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div> <br />
        likes {blog.likes}
        <button onClick={addLike}>like</button>
        <br />
        {blog.user.name} <br />
        {user.name === blog.user.name && (
          <div>
            <button onClick={deleteBlog}>delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog

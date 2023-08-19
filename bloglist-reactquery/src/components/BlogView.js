const BlogView = ({ user, blog, deleteBlog, addLike }) => {
  if (!blog)
    return null
  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={`https://${blog.url}`}>{blog.url}</a></div>
        likes {blog.likes}
      <button onClick={addLike}>like</button>
      <br />
      added by {blog.user.name} <br />
      {user.name === blog.user.name && (
        <div>
          <button onClick={deleteBlog}>delete</button>
        </div>
      )}
    </div>
  )
}

export default BlogView
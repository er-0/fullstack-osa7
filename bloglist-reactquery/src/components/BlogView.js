import CommentForm from './CommentForm'

const BlogView = ({ user, blog, deleteBlog, addLike, addComment }) => {
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
      <h3>comments</h3>
      <CommentForm addComment={addComment} blog={blog}/>
      {blog.comments
        .map((comment) => (
          <li key={comment}>
            {comment}
          </li>))
      }
    </div>
  )
} //comments should have their own ids for the key

export default BlogView
import CommentForm from './CommentForm'

const BlogView = ({ user, blog, deleteBlog, addLike, addComment }) => {
  if (!blog)
    return null
  return (
    <div>
      <h2 style={{ marginTop: 1 + 'em' }}>{blog.title}</h2>
      <div><a href={`https://${blog.url}`}>{blog.url}</a></div>
        likes {blog.likes}
      <button className="btn" onClick={addLike}>like</button>
      <br />
      <small>added by {blog.user.name} <br /></small>
      {user.name === blog.user.name && (
        <div>
          <button className="btn" onClick={deleteBlog}>delete</button>
        </div>
      )}
      <h3 style={{ marginTop: 1 + 'em' }}>comments</h3>
      <CommentForm addComment={addComment} blog={blog}/>
      <div style={{ marginLeft: 1 + 'em' }}>
        {blog.comments
          .map((comment) => (
            <li key={comment}>
              {comment}
            </li>))
        }
      </div>
    </div>
  )
} //comments should have their own ids for the key

export default BlogView
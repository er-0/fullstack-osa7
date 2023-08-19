const Blog = ({ blog }) => {

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
      <div>
        {blog.title}, {blog.author}
      </div>
    </div>
  )
}

export default Blog

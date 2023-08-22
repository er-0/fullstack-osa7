const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#bbecd1',
    marginBottom: 5,
    color: 'black',
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

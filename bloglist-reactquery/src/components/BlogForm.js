import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()
    addBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        title:
        <input
          type="text"
          value={title}
          id="Blogtitle"
          onChange={({ target }) => setTitle(target.value)}
        />{' '}
        <br />
        author:
        <input
          type="text"
          value={author}
          id="Blogauthor"
          onChange={({ target }) => setAuthor(target.value)}
        />{' '}
        <br />
        url:
        <input
          type="text"
          value={url}
          id="Blogurl"
          onChange={({ target }) => setUrl(target.value)}
        />{' '}
        <br />
        <button type="submit" id="blogformsubmit">
          add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm

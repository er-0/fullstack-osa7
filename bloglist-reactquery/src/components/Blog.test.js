import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    username: 'annam',
    name: 'Anna Mattila',
  },
}
const user = {
  username: 'annam',
  name: 'Anna Mattila',
}

test('renders title and author', () => {
  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('React patterns Michael Chan')
  expect(element).toBeDefined()
})

describe('clickable blog element', () => {
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('renders its children', () => {
    screen.getByText('https://reactpatterns.com/')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the title, children are displayed', async () => {
    const clicker = userEvent.setup()
    const button = screen.getByText('React patterns Michael Chan')
    await clicker.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

describe('like button', () => {
  test('two clicks call the event handler twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user} addLike={mockHandler} />)

    const clicker = userEvent.setup()
    const button = screen.getByText('like')
    await clicker.click(button)
    await clicker.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('blog form', () => {
  test('calls the event handler addBlog with the correct inputs', async () => {
    const clicker = userEvent.setup()
    const addBlog = jest.fn()

    const { container } = render(<BlogForm addBlog={addBlog} />)

    const titleInput = container.querySelector('#Blogtitle')
    const authorInput = container.querySelector('#Blogauthor')
    const urlInput = container.querySelector('#Blogurl')
    const sendButton = container.querySelector('#blogformsubmit')

    await clicker.type(titleInput, 'Test blog')
    await clicker.type(authorInput, 'Troy Barnes')
    await clicker.type(urlInput, 'https://testblog.com')
    await clicker.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test blog')
    expect(addBlog.mock.calls[0][0].author).toBe('Troy Barnes')
    expect(addBlog.mock.calls[0][0].url).toBe('https://testblog.com')
  })
})

import { useState } from 'react'

const CommentForm = ({ addComment, blog }) => {
  const [comment, setComment] = useState('')

  const addNewComment = async (event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  return (
    <div>
      <form onSubmit={addNewComment}>
        <input
          type="text"
          value={comment}
          id="Blogcomment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button className="btn" type="submit" id="commentformsubmit">
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm

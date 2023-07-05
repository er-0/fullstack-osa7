const Anecdote = ({anecdote}) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>For more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)
export default Anecdote
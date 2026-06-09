import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = () => {
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const user = meResult.data.me
  const books = booksResult.data.allBooks
  const recommendedBooks = books.filter(b => b.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend

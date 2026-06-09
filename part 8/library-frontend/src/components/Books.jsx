import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  // To get all unique genres, we might need a separate query,
  // but for simplicity, if we pass genre: null, we get all books
  const allBooksResult = useQuery(ALL_BOOKS)

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const allBooks = allBooksResult.data.allBooks

  // Find all unique genres across all books
  const allGenres = [...new Set(allBooks.flatMap(b => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map(g => 
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books

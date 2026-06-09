import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    axios.get(`${apiBaseUrl}/todos`).then(res => setTodos(res.data))
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${apiBaseUrl}/todos`, { text: newTodo })
    setTodos(todos.concat(res.data))
    setNewTodo('')
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} - {todo.done ? 'Done' : 'Not done'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

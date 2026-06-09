import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  return (
    <div className="app-container">
      <div className="counter-card">
        <h1>Counter</h1>
        <div className="counter-display">{count}</div>
        <div className="button-group">
          <button className="btn btn-decrement" onClick={handleDecrement}>
            - Decrement
          </button>
          <button className="btn btn-increment" onClick={handleIncrement}>
            + Increment
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

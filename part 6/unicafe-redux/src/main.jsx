import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const dispatch = (type) => {
    store.dispatch({ type })
  }

  return (
    <div>
      <h1>unicafe</h1>
      <button onClick={() => dispatch('GOOD')}>good</button>
      <button onClick={() => dispatch('OK')}>ok</button>
      <button onClick={() => dispatch('BAD')}>bad</button>
      <button onClick={() => dispatch('ZERO')}>reset stats</button>
      <div>
        <h2>statistics</h2>
        <p>good {store.getState().good}</p>
        <p>ok {store.getState().ok}</p>
        <p>bad {store.getState().bad}</p>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

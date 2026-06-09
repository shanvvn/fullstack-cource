import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [completionTime, setCompletionTime] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const handleAddTask = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || !completionTime) return
    const newTask = {
      id: Date.now(),
      text: trimmed,
      completionTime: completionTime
    }
    setTasks([...tasks, newTask])
    setInputValue('')
    setCompletionTime('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTask()
  }

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id)
  }

  const handleConfirmDelete = () => {
    setTasks(tasks.filter((task) => task.id !== confirmDeleteId))
    setConfirmDeleteId(null)
  }

  const handleCancelDelete = () => {
    setConfirmDeleteId(null)
  }

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.completionTime) - new Date(b.completionTime))

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        <h1 className="title">✅ My To-Do List</h1>

        {/* Input Row */}
        <div className="input-row">
          <input
            id="task-input"
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="datetime-local"
            className="task-input"
            style={{ flex: 0.5 }}
            value={completionTime}
            onChange={(e) => setCompletionTime(e.target.value)}
          />
          <button id="add-task-btn" className="add-btn" onClick={handleAddTask}>
            + Add
          </button>
        </div>

        {/* Task List */}
        {sortedTasks.length === 0 ? (
          <p className="empty-msg"></p>
        ) : (
          <ul className="task-list">
            {sortedTasks.map((task) => (
              <li key={task.id} className="task-item">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
                  <span className="task-text">{task.text}</span>
                  <span style={{ fontSize: '0.75rem', color: '#888888' }}>
                    Due: {new Date(task.completionTime).toLocaleString()}
                  </span>
                </div>
                <button
                  id={`delete-btn-${task.id}`}
                  className="delete-btn"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Task Count */}
        {tasks.length > 0 && (
          <p className="task-count">{tasks.length} task{tasks.length !== 1 ? 's' : ''} remaining</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">⚠️</div>
            <h2 className="modal-title">Delete Task?</h2>
            <p className="modal-msg">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button id="confirm-delete-btn" className="confirm-btn" onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
              <button id="cancel-delete-btn" className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

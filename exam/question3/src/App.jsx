import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    registerNumber: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState('')
  const [students, setStudents] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (/\d/.test(formData.name)) {
      newErrors.name = 'Name should not contain numbers'
    }

    if (!formData.registerNumber.trim()) {
      newErrors.registerNumber = 'Register number is required'
    } else if (/[a-zA-Z]/.test(formData.registerNumber)) {
      newErrors.registerNumber = 'Register number should not contain letters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setSuccessMsg('Registration successful!')
      // Add student to the list
      setStudents([...students, { ...formData, id: Date.now() }])
      // Reset form on success
      setFormData({ name: '', registerNumber: '', email: '', password: '' })
      setErrors({})
    } else {
      setSuccessMsg('')
    }
  }

  return (
    <div className="container">
      <h2>Student Registration Form</h2>
      {successMsg && <div className="success">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Register Number</label>
          <input
            type="text"
            name="registerNumber"
            value={formData.registerNumber}
            onChange={handleChange}
          />
          {errors.registerNumber && <span className="error">{errors.registerNumber}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="submit-btn" style={{ padding: '0.8rem', marginTop: '1rem', border: '1px solid #333', backgroundColor: '#eee', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
      </form>

      {/* Render the list of students */}
      {students.length > 0 && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h3>Registered Students</h3>
          <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
            {students.map((student) => (
              <li key={student.id} style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem' }}>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Reg No:</strong> {student.registerNumber}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { initializeBlogs, createBlog, likeBlog, deleteBlog, commentBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import usersService from './services/users'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) return null
  return <div style={{ border: 'solid', padding: 10, marginBottom: 10 }}>{notification}</div>
}

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password })).catch(() =>
      dispatch(setNotification('wrong credentials'))
    )
  }
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>username <input value={username} onChange={e => setUsername(e.target.value)} /></div>
        <div>password <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const BlogList = () => {
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id} style={{ border: '1px solid #ccc', padding: 5, margin: 5 }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      ))}
    </div>
  )
}

const BlogView = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  if (!blog) return <div>blog not found</div>

  const handleLike = () => dispatch(likeBlog(blog))
  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }
  const handleComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
      <div>added by {blog.user && blog.user.name}</div>
      <button onClick={handleRemove}>remove</button>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={e => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>{(blog.comments || []).map((c, i) => <li key={i}>{c}</li>)}</ul>
    </div>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => { usersService.getAll().then(u => setUsers(u)) }, [])
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead><tr><th></th><th>blogs created</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}><td><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const UserView = () => {
  const [users, setUsers] = useState([])
  const id = useParams().id
  useEffect(() => { usersService.getAll().then(u => setUsers(u)) }, [])
  const user = users.find(u => u.id === id)
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{user.blogs.map(b => <li key={b.id}>{b.title}</li>)}</ul>
    </div>
  )
}

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification(`a new blog ${title} by ${author} added`))
    setTitle(''); setAuthor(''); setUrl(''); setVisible(false)
  }

  if (!visible) return <button onClick={() => setVisible(true)}>new blog</button>

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>title: <input value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div>author: <input value={author} onChange={e => setAuthor(e.target.value)} /></div>
        <div>url: <input value={url} onChange={e => setUrl(e.target.value)} /></div>
        <button type="submit">create</button>
        <button type="button" onClick={() => setVisible(false)}>cancel</button>
      </form>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => { dispatch(initializeBlogs()) }, [dispatch])
  useEffect(() => { dispatch(initializeUser()) }, [dispatch])

  if (!user) return <div><Notification /><LoginForm /></div>

  const navStyle = { padding: 5, background: '#eee', marginBottom: 10 }

  return (
    <div>
      <div style={navStyle}>
        <Link to="/" style={{ paddingRight: 5 }}>blogs</Link>
        <Link to="/users" style={{ paddingRight: 5 }}>users</Link>
        {user.name} logged in <button onClick={() => dispatch(logoutUser())}>logout</button>
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<><BlogForm /><BlogList /></>} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserView />} />
      </Routes>
    </div>
  )
}

export default App

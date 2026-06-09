const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Todo = require('./mongo/models/Todo')
const { getAsync, setAsync } = require('./redis')

app.use(cors())
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

app.get('/todos', async (req, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

app.post('/todos', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  
  const currentCount = await getAsync('added_todos')
  const newCount = (currentCount ? parseInt(currentCount) : 0) + 1
  await setAsync('added_todos', newCount)

  res.send(todo)
})

app.get('/statistics', async (req, res) => {
  const addedTodos = await getAsync('added_todos')
  res.send({ added_todos: addedTodos ? parseInt(addedTodos) : 0 })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

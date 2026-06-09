import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) { return action.payload },
    appendBlog(state, action) { state.push(action.payload) },
    updateBlog(state, action) {
      return state.map(b => b.id !== action.payload.id ? b : action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}
export const createBlog = (blog) => async dispatch => {
  const newBlog = await blogService.create(blog)
  dispatch(appendBlog(newBlog))
}
export const likeBlog = (blog) => async dispatch => {
  const updated = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id || blog.user })
  dispatch(updateBlog(updated))
}
export const deleteBlog = (id) => async dispatch => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}
export const commentBlog = (id, comment) => async dispatch => {
  const updated = await blogService.addComment(id, comment)
  dispatch(updateBlog(updated))
}

export default blogSlice.reducer

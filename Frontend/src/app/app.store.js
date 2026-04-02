import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import postReducer from '../features/posts/post.slice'
import storyReducer from '../features/posts/story.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    story: storyReducer
  },
})
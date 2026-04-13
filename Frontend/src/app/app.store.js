import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import postReducer from '../features/posts/post.slice'
import storyReducer from '../features/posts/story.slice'
import userReducer from '../features/users/user.slice'
import notificationReducer from '../features/notifications/notification.slice'
import profileReducer from '../features/profile/profile.slice'
import messegesReducer from '../features/messeges/messeges.slice'
  
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    story: storyReducer,
    user: userReducer,
    notification: notificationReducer,
    profile: profileReducer,
    messeges: messegesReducer,
  },
})
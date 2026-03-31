import React from 'react'
import { RouterProvider } from 'react-router'
import authRoutes from './auth.routes'
import { store } from './app.store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={authRoutes} />
    </Provider>
  )
}

export default App
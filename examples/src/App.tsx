import { Outlet, RouterProvider } from '@tanstack/react-router'

import { Header } from './utils/Header'
import { router } from './utils/router'

import './App.css'

function App() {
  return (
    <RouterProvider router={router}>
      <Header />
      <hr />
      <Outlet />
    </RouterProvider>
  )
}

export default App

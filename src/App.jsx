import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AllTodos from './components/AllTodos'
import Viewtodo from './components/Viewtodo'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: '/files',
      element:
      <div>
        <Navbar />
        <AllTodos />
      </div>
    },
    {
      path: '/files/:id',
      element:
      <div>
        <Navbar />
        <Viewtodo />
      </div>
    },


  ]
)

const App = () => {
  return (
    <div className='bg-zinc-900 w-full min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

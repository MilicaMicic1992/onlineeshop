import React from 'react'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './AppLayout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  HomePage  from './pages/HomePage.jsx'

//router

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element: <HomePage />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

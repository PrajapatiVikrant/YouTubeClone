import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {Provider} from "react-redux"
import './index.css'
import App from './App.jsx'
import Welcome from './page/Welcome.jsx'
import Login from './page/Login.jsx'
import Store from './State/store.js'
import Signup from './page/Signupt.jsx'





const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Welcome/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={Store}>

    <RouterProvider router={appRouter}/>
     </Provider>
  
  </StrictMode>,
)

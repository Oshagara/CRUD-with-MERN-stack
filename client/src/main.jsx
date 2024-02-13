import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home.jsx';
import AddUser from './component/AddUser.jsx';
import UpdateUser from './component/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        loader: ()=> fetch('http://localhost:5000/users')
      },
      {
        path: "/AddUser",
        element: <AddUser/>,
      },
      {
        path: "/UpdateUser/:id",
        element: <UpdateUser/>,
        loader: ({ params }) =>
        fetch(`http://localhost:5000/users/${params.id}`),
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

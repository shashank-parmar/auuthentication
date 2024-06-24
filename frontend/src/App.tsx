
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from './auth/Signup'
import Login from './auth/Login';
import Home from "./auth/Home";
import ForgotPass from "./auth/ForgotPass"
import ResetPass from "./auth/ResetPass"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup></Signup>
    },
    {
      path: "/login",
      element: <Login></Login>
    },
    {
      path:"/Home",
      element:<Home></Home>
    },
    {
      path:"/forgotpass",
      element:<ForgotPass></ForgotPass>
    },
    {
      path:"/resetPass",
      element:<ResetPass></ResetPass>
    }
    
  ]);
  return (
    <>
      <RouterProvider router={router} />
      </>
  )
}

export default App

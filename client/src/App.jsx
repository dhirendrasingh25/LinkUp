import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useLocation,
  Outlet,
  Routes,
  Navigate
} from "react-router-dom";


function Layout(){
  const user= null
  const location= useLocation()

  return user?.token?(
    <Outlet />
  ):(
    <Navigate to='/login' state={{from: location}} replace />
  )
}


import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import Login from './pages/Login';


const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id?' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      
    </div>
  )
}

export default App

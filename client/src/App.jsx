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
  const {user}= useSelector((state)=>state.user)
  const location= useLocation()
  console.log(user);

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
import Profile from './pages/Profile';

import { useSelector } from 'react-redux';


const App = () => {
  const {theme} = useSelector((state)=>state.theme)
   console.log(theme);

  return (
    <div data-theme={theme} class='w-full min-h-[100vh]'>
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

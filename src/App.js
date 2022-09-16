import React, { useEffect } from 'react'
import './scss/App.css'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import LoginSignup from './containers/LoginSignup'
import SubFolder from './containers/SubFolder'
import ProtectedRoute from './containers/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, userPersist } from './store/actions/userActions'

const App = () => {
  // const currentUser = useSelector((state) => state)
  // const dispatch = useDispatch

  // useEffect(() => {
    // console.log(currentUser)
    // const loggedInUser = currentUser
    // console.log(loggedInUser)
  // }, [])

  // const handleLogout = (e) => {
  //   e.preventDefault()
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('token_exp')
  //   dispatch(logoutUser)
  // }

  return (
    <BrowserRouter>
        <Routes>
          <Route index 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path='/login-signup' element={<LoginSignup />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path='/folder/:id' element={
            <ProtectedRoute>
              <Folder />
            </ProtectedRoute>
          }/>
          <Route path='/subfolder/:id' element={
            <ProtectedRoute>
              <SubFolder />
            </ProtectedRoute>
          }/>
          <Route path='/recipe/:id' element={
            <ProtectedRoute>
              <Recipe />
            </ProtectedRoute>
          }/>
          <Route path='*' element={<div>404 not found</div>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

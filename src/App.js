import React from 'react'
import './scss/App.css'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import LoginSignup from './containers/LoginSignup'
import SubFolder from './containers/SubFolder'
import ProtectedRoute from './containers/ProtectedRoute'

const App = () => {
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

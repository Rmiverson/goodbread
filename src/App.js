import React from 'react'
import './scss/App.css'

import { Routes, Route, BrowserRouter, Redirect } from 'react-router-dom'

import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import LoginSignup from './containers/LoginSignup'
import SubFolder from './containers/SubFolder'
import userEvent from '@testing-library/user-event'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login-signup' element={<LoginSignup />} />
          
          {!userEvent.id && <Redirect to='/login-signup' />}

          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/folder/:id' element={<Folder />} />
          <Route path='/subfolder/:id' element={<SubFolder />} />
          <Route path='/recipe/:id' element={<Recipe />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

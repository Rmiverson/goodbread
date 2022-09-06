import React from 'react'
import './scss/App.css'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import Login from './containers/Login'
import SubFolder from './containers/SubFolder'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          
          
          <Route path='/profile' element={<Profile />} />
          <Route path='/folder/:id' element={<Folder />} />
          <Route path='/subfolder/:id' element={<SubFolder />} />
          <Route path='/recipe/:id' element={<Recipe />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

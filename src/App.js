import React from 'react'
import './scss/App.css'

// import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/persistStore'
import { Routes, Route, withRouter } from 'react-router-dom'

import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import Login from './containers/Login'
import SubFolder from './containers/SubFolder'

const App = () => {
  return (
    // <Provider store={store}>
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
    // </Provider>
  )
}

export default App

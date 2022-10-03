import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import LoginSignup from './containers/LoginSignup'
import SubFolder from './containers/SubFolder'
import ProtectedRoute from './containers/ProtectedRoute'
import CreateRecipe from './containers/CreateRecipe'
import CreateFolder from './containers/CreateFolder'
import CreateSubFolder from './containers/CreateSubFolder'
import EditRecipe from './containers/EditRecipe'

const RouteBoard = () => {
    return(
        <Routes>
            <Route path='/login-signup' element={<LoginSignup />} />
            <Route index element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            }/>
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
            <Route path='/folder/create' element={
                <ProtectedRoute>
                    <CreateFolder />
                </ProtectedRoute>
            }/>
            <Route path='/folder/:folderId/subfolder/:id' element={
                <ProtectedRoute>
                    <SubFolder />
                </ProtectedRoute>
            }/>
            <Route path='/folder/:folderId/subfolder/create' element={
                <ProtectedRoute>
                    <CreateSubFolder />
                </ProtectedRoute>
            }/>
            <Route path='/recipe/create' element={
                <ProtectedRoute>
                    <CreateRecipe />
                </ProtectedRoute>
            }/>
            <Route path='/recipe/:id' element={
                <ProtectedRoute>
                    <Recipe />
                </ProtectedRoute>
            }/>
            <Route path='/recipe/edit/:id' element={
                <ProtectedRoute>
                    <EditRecipe />
                </ProtectedRoute>
            }/>                
            
            <Route path='*' element={<div>404 not found</div>} />
        </Routes>
    )
}

export default RouteBoard
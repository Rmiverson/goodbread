import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Folder from './containers/Folder'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Recipe from './containers/Recipe'
import Login from './containers/Login'
import SubFolder from './containers/SubFolder'

const Routes = () => {
    return (
        <>
            <Switch>
                <Route path='/login' component={Login} />
                

            </Switch>
        </>
    )
}
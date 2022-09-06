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
                
                <Route path='/' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/folder/:id' component={Folder} />
                <Route path='/subfolder/:id' component={SubFolder} />
                <Route path='/recipe/:id' component={Recipe} />
            </Switch>
        </>
    )
}

export default withRouter(Routes)
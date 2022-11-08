import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../redux/actions'
import '../scss/nav.scss'

const Nav = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)

    const handleLogout = () => {
        dispatch(userLogout)
    }

    if (currentUser.id) {
        return (
            <nav className='nav-bar'>
                <Link className='nav-item logout' to="/login-signup" onClick={handleLogout}>Logout</Link>            
                <Link className='nav-item' to="/profile">Profile</Link>
                <Link className='nav-item' to="/">Home</Link>
            </nav>
        )
    }
}

export default Nav
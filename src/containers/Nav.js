import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../redux/actions'

const Nav = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)

    const handleLogout = () => {
        dispatch(userLogout)
    }

    if (currentUser.id) {
        return (
            <nav className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login-signup" onClick={handleLogout}>Logout</Link>            
            </nav>
        )
    }
}

export default Nav
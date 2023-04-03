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

    const renderItems = () => {
        if (currentUser.id) {
            return (
                <div className='nav-items'>
                    <Link className='nav-item' to="/">Home</Link>
                    <Link className='nav-item' to="/recipes">Recipes</Link>
                    <Link className='nav-item' to="/folders">Folders</Link>
                    <Link className='nav-item' to="/profile">Profile</Link>
                    <Link className='nav-item logout' to="/login-signup" onClick={handleLogout}>Logout</Link>
                </div>
            )
        }
    }

    return (
        <nav className='nav-bar'>
            {renderItems()}
        </nav>
    )
}

export default Nav
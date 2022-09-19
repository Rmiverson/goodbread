import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux/actions'

const Nav = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser)
    }

    const renderNav = () => {
        if (currentUser) {
            return (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )
        } else {
            return <Link to="/login-signup">Login</Link>
        }
    }

    return (
        <nav>
            {renderNav()}
        </nav>
    )
}

export default Nav
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

    const renderNav = () => {
        if (currentUser.id) {
            return (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/login-signup" onClick={handleLogout}>Logout</Link>
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
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions/userActions'

const Nav = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)

    const renderNav = () => {
        if (currentUser.id) {
            return(
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={dispatch(logoutUser)}>Logout</button>
                </nav>                
            )         
        }
    }

    return (
        <>
            {renderNav()}
        </>

    )
}

export default Nav
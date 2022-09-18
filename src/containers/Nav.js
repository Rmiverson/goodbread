import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Nav = () => {
    const currentUser = useSelector((state) => state.user)

    return (
        <nav>
            <NavLink />
        </nav>
    )
}

export default Nav
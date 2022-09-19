import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
    const currentUser = useSelector((state) => state.user)
    return(
        <div className='Home'>
            <h2>Home</h2>
            <Link to='/create-recipe'>Create Recipe</Link>
        </div>
    )
}

export default Home
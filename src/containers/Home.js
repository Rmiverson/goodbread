import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const currentUser = useSelector((state) => state.user)
    return(
        <div className='Home'>
            <h2>Home</h2>
            {console.log(currentUser)}
        </div>
    )
}

export default Home
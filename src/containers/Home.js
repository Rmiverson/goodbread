import React from 'react'
import { useSelector } from 'react-redux'
import Recipes from './Recipes'
import Folders from './Folders'

const Home = () => {
    const currentUser = useSelector((state) => state.user)

    return(
        <div className='home'>
            <h2>Home</h2>
            <Recipes currentUser={currentUser} />                
            <Folders currentUser={currentUser} />
        </div>
    )        
}

export default Home
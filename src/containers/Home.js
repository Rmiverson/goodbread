import '../scss/home.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import Recipes from './Recipes'
import Folders from './Folders'

const Home = () => {
    const currentUser = useSelector((state) => state.user)

    return(
        <div className='home main-content'>
            <Folders currentUser={currentUser} />
            <Recipes currentUser={currentUser} />                
        </div>
    )        
}

export default Home
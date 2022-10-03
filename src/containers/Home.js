import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Folders from './Folders'
import Recipes from './Recipes'

const Home = () => {
    const currentUser = useSelector((state) => state.user)

    // TODO: add ways to edit: recipes, folders, sub-folder, user
    // TODO: in the edit pages, add ways to delete that resource
    // TODO: get started on styling

    // Future TODO: migrate sub-folders to be folders but just with self-joins


    return(
        <div className='Home'>
            <h2>Home</h2>
            <Link to='/recipe/create'>Create Recipe</Link>
            <Link to='/folder/create'>Create Folder</Link>
            <Recipes currentUser={currentUser} />
            <Folders currentUser={currentUser} />
        </div>
    )        
}

export default Home
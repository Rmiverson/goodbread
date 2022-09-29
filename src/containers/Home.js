import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Recipes from './Recipes'

const Home = () => {
    const currentUser = useSelector((state) => state.user)

    //// make a call fetching all recipes w/ pagination
    // TODO: make a call for folders w/ pagination
    // TODO: make a way to make new folders and route to them
    // TODO: ^^ same with sub-folders
    // TODO: work out profile page
    // TODO: work out folder page
    // TODO: work out sub-folder page
    // TODO: add ways to edit: recipes, folders, sub-folder, user
    // TODO: in the edit pages, add ways to delete that resource
    // TODO: strait out error handling and make it more useful for the user
    // TODO: get started on styling


    return(
        <div className='Home'>
            <h2>Home</h2>
            <Link to='/create-recipe'>Create Recipe</Link>
            <Link to='/create-folder'>Create Folder</Link>
            <Recipes currentUser={currentUser} />
        </div>
    )        
}

export default Home
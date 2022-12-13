import React, { useState } from 'react'
import '../scss/create-edit-folder.scss'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import apiClient from '../http-common'
import Recipes from './Recipes'

const CreateFolder = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null, submitted: false})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [checkedRecipes, setCheckedRecipes] = useState([])

    const currentUser = useSelector((state) => state.user)
    let dataPackage = {}

    const { isLoading: isPostingFolder, mutate: postFolder } = useMutation(
        async () => {
            return await apiClient.post('/folders', {folder: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null, submitted: true})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err, submitted: false})
            }
        }
    )

    const handleTitleChange = (e) => setTitle(e.target.value)

    const handleDescriptionChange = (e) => setDescription(e.target.value)

    const handleAddRecipe = (recipe) => () => {
        if (!checkedRecipes.includes(recipe)) {
            setCheckedRecipes([...checkedRecipes, recipe])
        }
    }

    const handleRemoveRecipe = (targetRecipe) => () => setCheckedRecipes(checkedRecipes.filter((recipe) => recipe.id !== targetRecipe.id))

    const submitFolder = (e) => {
        e.preventDefault()
        let recipeIds = checkedRecipes.map((recipe) => {return recipe.id})

        dataPackage = {
            user_id: currentUser.id,
            title: title,
            description: description,
            recipe_ids: recipeIds
        }

        try {
            postFolder()
        } catch (err) {
            console.error(err)
            setResult({data: {}, status: 'Error', message: err, submitted: false})
        }
    }

    const renderErrors = () => {
        if (result.status === 'Error') {
            return <span>{result.status + ': ' + result.message}</span>
        }
    }
    
    if (isPostingFolder) {
        return <span>Loading...</span>
    } else if (result.submitted) {
        return <Navigate to={`/folder/${result.data.id}`} replace/>
    } else {
        return(
            <div className='create-folder-page'>
                <h2>Create Folder Form</h2>
                {renderErrors()}
                <form onSubmit={submitFolder}>
                    <div className='folder-input-section'>
                        <label>Title</label>
                        <input required type='text' name='title' value={title} onChange={handleTitleChange} />                        
                    </div>

                    <div className='folder-input-section'>
                        <label>Description</label>
                        <textarea name='description' value={description} onChange={handleDescriptionChange} rows='4' cols='50' />                        
                    </div>

                    <div className='card-grid'>
                        {checkedRecipes.map((recipe, recipeIndex) => (
                            <div className='grid-item' key={recipeIndex}>
                                <h4>{recipe.title}</h4>
                                <button className='content-input-form-delete' type='button' onClick={handleRemoveRecipe(recipe)}>Remove Recipe</button>
                            </div>
                        ))}                        
                    </div>

                    <Recipes formList={true} currentUser={currentUser} handleAddRecipe={handleAddRecipe} handleRemoveRecipe={handleRemoveRecipe} checkedRecipes={checkedRecipes.map(recipe => recipe.id)}/>

                    <input className='form-submit-button' type='submit' value='Submit Folder' />
                </form>
            </div>
        )        
    }

}

export default CreateFolder
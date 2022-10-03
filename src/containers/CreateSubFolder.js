import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import apiClient from '../http-common'
import FolderRecipes from './FolderRecipes'

const CreateSubFolder = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null, submitted: false})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [checkedRecipes, setCheckedRecipes] = useState([])

    const currentUser = useSelector((state) => state.user)
    let dataPackage = {}
    const parentFolderId = useParams().folderId

    const { isLoading: isPostingSubFolder, mutate: postSubFolder} = useMutation(
        async () => {
            return await apiClient.post('/sub_folders', {sub_folder: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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

    const handleRemoveRecipe = (targetRecipe) => () => {
        if (checkedRecipes.includes(targetRecipe)) {
            setCheckedRecipes(checkedRecipes.filter((recipe) => recipe.id !== targetRecipe.id))
        }
    }

    const submitSubFolder = (e) => {
        e.preventDefault()
        let recipeIds = checkedRecipes.map((recipe) => {return recipe.id})

        dataPackage = {
            folder_id: parentFolderId,
            title: title,
            description: description,
            recipe_ids: recipeIds
        }

        try {
            postSubFolder()
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

    if (isPostingSubFolder || !result.status) {
        return <span>Loading...</span>
    } else if (result.submitted) {
        return <Navigate to={`/folder/${parentFolderId}/subfolder/${result.data.id}`} replace/>
    } else {
        return(
            <div className='create-sub-folder-form'>
                <h2>Create Sub-Folder Form</h2>
                {renderErrors()}
                <form onSubmit={submitSubFolder}>
                    <label>Title</label>
                    <input required type='text' name='title' value={title} onChange={handleTitleChange} />

                    <label>Description</label>
                    <input type='text' name='description' value={description} onChange={handleDescriptionChange} />

                    {checkedRecipes.map((recipe, recipeIndex) => (
                        <div key={recipeIndex}>
                            <h4>{recipe.title}</h4>
                            <button type='button' onClick={handleRemoveRecipe(recipe)}>Remove Recipe</button>
                        </div>
                    ))}

                    <FolderRecipes folderId={parentFolderId} formList={true} currentUser={currentUser} handleAddRecipe={handleAddRecipe} />

                    <input type='submit' value='Submit Sub-Folder' />
                </form>
            </div>
        )
    }
}

export default CreateSubFolder
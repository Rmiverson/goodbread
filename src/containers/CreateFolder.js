import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import apiClient from '../http-common'

import Recipes from './Recipes'

const CreateFolder = () => {
    const [postResult, setPostResult] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [title, setTitle] = useState('')
    const [checkedRecipes, setCheckedRecipes] = useState([])

    const currentUser = useSelector((state) => state.user)
    let dataPackage = {}

    const { isLoading: isPostingFolder, mutate: postFolder } = useMutation(
        async ()  => {
            await apiClient.post('/folders', {folder: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
        },
        {
            onSuccess: (res) => {
                const result = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                setPostResult(result)
                setSubmitted(true)
            },
            onError: (err) => {
                console.error(err.response?.data || err)
            }
        }
    )

    useEffect(() => {
        if (isPostingFolder) setPostResult('Loading...')
    }, [isPostingFolder])


    const handleTitleChange = (e) => setTitle(e.target.value)

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

    const submitFolder = (e) => {
        e.preventDefault()

        dataPackage = {
            user_id: currentUser.id,
            title: title
        }

        try {
            postFolder()
        } catch (err) {
            console.error(err)
        }
    }
    
    if (postResult === 'Loading...') {
        return <span>{postResult}</span>
    } else if (submitted) {
        return <Navigate to={`/folder/${postResult.data.id}`} replace/>
    } else {
        return(
            <div className='create-folder-form'>
                <h3>Create Folder Form</h3>
                <form onSubmit={submitFolder}>
                    <label>Title</label>
                    <input required type='text' name='title' value={title} onChange={handleTitleChange} />

                    {checkedRecipes.map((recipe, recipeIndex) => (
                        <div key={recipeIndex}>
                            <h4>{recipe.title}</h4>
                            <button type='button' onClick={handleRemoveRecipe(recipe)}>Remove Recipe</button>
                        </div>
                    ))}

                    <Recipes formList={true} currentUser={currentUser} handleAddRecipe={handleAddRecipe}/>

                    <input type='submit' value='Submit Folder' />
                </form>
            </div>
        )        
    }

}

export default CreateFolder
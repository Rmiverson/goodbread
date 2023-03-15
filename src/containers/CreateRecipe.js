import React, { useState } from 'react'
import '../scss/create-edit-recipe.scss'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import TagForm from '../components/TagForm'
import apiClient from '../http-common'
import { Navigate } from 'react-router-dom'
import Error from '../components/Error'
import Loading from '../components/Loading'
import RichTextEditor from '../components/RichTextEditor'

import { $generateHtmlFromNodes } from '@lexical/html'

const CreateRecipe = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bodyText, setBodyText] = useState('')
    const [tags, setTags] = useState([{id: null, label: '' }])
    const [result, setResult] = useState({data: {}, status: null, message: null, submitted: false})

    const currentUser = useSelector((state) => state.user)

    let dataPackage = {}

    const { isLoading: isPostingRecipe, mutate: postRecipe } = useMutation(
        async () => {
            return await apiClient.post('/recipes', {recipe: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null, submitted: true})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}, submitted: false})
            }
        }
    )

    // title handler
    const handleTitleChange = (e) => setTitle(e.target.value)

    // description handler
    const handleDescChange = (e) => setDescription(e.target.value)

    // lexical editor handler
    const handleBodyTextChange = (editorState, editor) => {
        const htmlStr = editorState.read(() => {
            return $generateHtmlFromNodes(editor, null)
        })

        setBodyText(htmlStr)
    }

    // tag change handler
    const handleTagChange = (targetIndex) => (e) => {
        const newTags = tags.map((tag, tagIndex) => {
            if (targetIndex !== tagIndex) return tag
            return {id: null, label: e.target.value}
        })
        setTags(newTags)
    }

    // tag add
    const addTag = () => setTags([...tags, {id: null, label: ''}])

    // tag remove
    const removeTag = (targetIndex) => () => {
        if (tags.length <= 1) {
            window.alert('Must have at least one tag.')
        } else {
            setTags(tags.filter((tag, tagIndex) => targetIndex !== tagIndex))
        }
    }

    // submit recipe handler
    const submitRecipe = (e) => {
        e.preventDefault()
        e.stopPropagation()

        dataPackage = {
            user_id: currentUser.id,
            title: title,
            description: description,
            bodyText: bodyText,
            tag_list: tags
        }

        try {
            postRecipe()
        } catch (err) {
            setResult({data: {}, status: 'Error', message: err, submitted: false})        }
    }

    const renderErrors = () => {
        if (result.status === 'Error') {
            return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
        }
    }

    if (isPostingRecipe) {
        return <Loading />
    } else if (result.submitted) {
        return <Navigate to={`/recipe/${result.data.id}`} replace />
    } else {
        return(
            <div className='create-recipe-page'>
                <h2>Create New Recipe</h2>
                {renderErrors()}
                <form id='create-recipe-form' onSubmit={submitRecipe}>
                    <div className='input-section'>
                        <label>Title</label>
                        <input className='title-input' required type='text' name='title' value={title} onChange={handleTitleChange} />                        
                    </div>

                    <div className='input-section'>
                        <label>Description</label>
                        <textarea className='desc-input' required name='description' value={description} onChange={handleDescChange} rows='4' />
                    </div>

                    <div className='input-section'>
                        <RichTextEditor handleBodyTextChange={handleBodyTextChange} />    
                    </div>

                    <TagForm
                        tags={tags}
                        addTag={addTag}
                        handleTagChange={handleTagChange}
                        removeTag={removeTag}
                    />
                    <div className='form-mortality-controls'>
                        <input className='form-submit-button' form='create-recipe-form' type='submit' value='Submit Recipe' />     
                    </div>
                </form>
            </div>
        )        
    }
}    

export default CreateRecipe
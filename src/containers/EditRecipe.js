import React, { useState, useEffect } from 'react'
import '../scss/create-edit-recipe.scss'
import { useMutation, useQuery } from 'react-query'
import { useParams, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import apiClient from '../http-common'
import TagForm from '../components/TagForm'
import Error from '../components/Error'
import Loading from '../components/Loading'
import RichTextEditor from '../components/RichTextEditor'

import { $generateHtmlFromNodes } from '@lexical/html'

const EditRecipe = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null, submitted: false, deleted: false})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bodyText, setBodyText] = useState('')
    const [tags, setTags] = useState([{id: null, label: null}])
    const { id } = useParams()
    const currentUser = useSelector((state) => state.user)

    let dataPackage = {}

    const { isLoading: isLoadingRecipe, refetch: getRecipeById } = useQuery(
        'query-recipe-by-id',
        async () => {
            return await apiClient.get(`/recipes/${id}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
        },
        {
            enabled: false,
            retry: 1,
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null, submitted: false, deleted: false})
                setTitle(apiResp.data.title)
                setDescription(apiResp.data.description)
                setBodyText(apiResp.data.bodyText)
                setTags(apiResp.data.tags)
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}})
            }
        }
    )

    const { isLoading: isPuttingRecipe, mutate: putRecipe } = useMutation(
        async () => {
            return await apiClient.put(`/recipes/${id}`, {recipe: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null, submitted: true, deleted: false})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}, submitted: false, deleted: false})
            }
        }
    )

    const { isLoading: isDeletingRecipe, mutate: deleteRecipe } = useMutation(
        async () => {
            return await apiClient.delete(`/recipes/${id}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                setResult({data: {}, status: apiResp.status, message: null, submitted: false, deleted: true})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}, submitted: false, deleted: false})
            }            
        }
    )

    useEffect(() => {
        function ferretRecipeById() {       
            if (id) {
                try {
                    getRecipeById()
                } catch (err) {
                    setResult(err)
                }
            }
        }

        ferretRecipeById()
    }, [getRecipeById, setResult, id])

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
            return {...tag, label: e.target.value}
        })
        setTags(newTags)
    }

    // tag add
    const addTag = () => setTags([...tags, {id: null, label: ''}])

    // tag remove
    const removeTag = (targetIndex) => (e) => {
        if (tags.length <= 1) {
            window.alert('Must have at least one tag.')
        } else {
            setTags(tags.filter((tag, tagIndex) => targetIndex !== tagIndex))
        }
    }

    const handleDelete = () => {
        try {
            deleteRecipe()
        } catch (err) {
            console.error(err)
            setResult({data: {}, status: 'Error', message: err, submitted: false, deleted: false})
        }
    }

    const submitRecipe = (e) => {
        e.preventDefault()
        e.stopPropagation()

        dataPackage = {
            id: id,
            user_id: currentUser.id,
            title: title,
            description: description,
            bodyText: bodyText,
            tag_list: tags
        }

        try {
            putRecipe()
        } catch (err) {
            console.error(err)
            setResult({data: {}, status: 'Error', message: err, submitted: false, deleted: false})}
    }

    const renderErrors = () => {
        if (result.status === 'Error') {
            return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
        }
    }

    if (isPuttingRecipe || isLoadingRecipe || isDeletingRecipe || !result.status) {
        return <Loading />
    } else if (result.submitted) {
        return <Navigate to={`/recipe/${result.data.id}`} replace />
    } else if (result.deleted) {
        return <Navigate to='/' replace />
    } else {
        return (
            <div className='edit-recipe-page'>
                <h2>Edit Recipe</h2>
                {renderErrors()}
                <form id='edit-recipe-form' onSubmit={submitRecipe}>
                    <div className='input-section'>
                        <label>Title</label>
                        <input className='title-input' required type='text' name='title' value={title} onChange={handleTitleChange} />                        
                    </div>

                    <div className='input-section'>
                        <label>Description</label>
                        <textarea className='desc-input' required type='text' name='description' value={description} onChange={handleDescChange} rows='4' />                        
                    </div>

                    <div className='input-section'>
                        <RichTextEditor handleBodyTextChange={handleBodyTextChange} bodyText={bodyText}/>    
                    </div>

                    <TagForm
                        tags={tags}
                        addTag={addTag}
                        handleTagChange={handleTagChange}
                        removeTag={removeTag}
                    />
                    <div className='form-mortality-controls'>
                        <input className='form-delete-button' type='button' onClick={handleDelete} value='Delete Recipe' />
                        <input className='form-submit-button' form='edit-recipe-form' type='submit' value='Submit Recipe' />                          
                    </div>
  
                </form>
            </div>
        )
    }
}

export default EditRecipe
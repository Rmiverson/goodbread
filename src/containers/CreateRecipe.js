import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { List, arrayMove } from 'react-movable'
import { useMutation } from 'react-query'

import OlForm from '../components/OlForm'
import UlForm from '../components/UlForm'
import TextboxForm from '../components/TextboxForm'
import TagForm from '../components/TagForm'

import apiClient from '../http-common'
import { Navigate } from 'react-router-dom'

const CreateRecipe = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [components, setComponents] = useState([])
    const [tags, setTags] = useState([''])
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
                setResult({data: {}, status: 'Error', message: err.response?.data || err, submitted: false})
            }
        }
    )  

    const reorderArr = (arr, currentIndex, direction) => {
        let targetIndex = currentIndex + direction

        if (targetIndex >= arr.length || targetIndex < 0) {
            return arr
        }

        let grabbed = arr[currentIndex]
        let swapped = arr[targetIndex]

        arr[targetIndex] = grabbed
        arr[currentIndex] = swapped

        return arr
    }

    // title handler
    const handleTitleChange = (e) => setTitle(e.target.value)

    // description handler
    const handleDescChange = (e) => setDescription(e.target.value)

    // component remove
    const removeComponent = (targetIndex) => () => setComponents(components.filter((component, componentIndex) => targetIndex !== componentIndex))    

    // component title change
    const handleComponentTitleChange = (targetIndex) => (e) => {
        const newComponents = components.map((component, componentIndex) => {
            if (targetIndex !== componentIndex) return component
            return {...component, title: e.target.value}
        })
        setComponents(newComponents)
    }

    // textbox add
    const addTextbox = () => setComponents([...components, {type: 'textbox', title: '', text_content: ''}])

    // unordered_list add
    const addUl = () => setComponents([...components, {type: 'ul', title:'', list_items: ['']}])

    // ordered_list add
    const addOl = () => setComponents([...components, {type: 'ol', title:'', list_items: ['']}])
    
    // textbox text content change
    const handleTextboxTextContentChange = (targetIndex) => (e) => {
        const newComponents = components.map((component, compoentnIndex) => {
            if (targetIndex !== compoentnIndex) return component
            return {...component, text_content: e.target.value}
        })
        setComponents(newComponents)
    }

    // list_item change handler
    const handleListItemChange = (targetComponentIndex, TargetListIndex) => (e) => {
        const newComponents = components.map((component, componentIndex) => {
            if (targetComponentIndex !== componentIndex) return component
                const newComponentListItems = component.list_items.map((list_item, listItemIndex) => {
                if (TargetListIndex !== listItemIndex) return list_item
                    return e.target.value
            })
            return {...component, list_items: newComponentListItems}
        })
        setComponents(newComponents)
    }

    // list_item add
    const addListItem = (targetIndex) => () => {
        const newComponents = components.map((component, componentIndex) => {
            if (targetIndex !== componentIndex) return component
            return {...component, list_items: [...component.list_items, '']}
        })
        setComponents(newComponents)
    }

    // list_item remove
    const removeListItem = (targetComponentIndex, targetListItemIndex) => () => {
        const newComponents = components.map((component, componentIndex) => {
            if (targetComponentIndex !== componentIndex) return component
            if (component.list_items.length <= 1) {
                console.error('Lists must have at least one item.')
                return component
            } else {
                return {...component, list_items: component.list_items.filter((list_item, listItemIndex) => targetListItemIndex !== listItemIndex)}
            }
        })
        setComponents(newComponents)
    }

    // list_item reorder
    const handleListItemReorder = (targetComponentIndex, targetListItemIndex, direction) => () => {
        const newComponents = components.map((component, componentIndex) => {
            if (targetComponentIndex !== componentIndex) return component

            let newListItems = reorderArr(component.list_items, targetListItemIndex, direction)
            return {...component, list_items: newListItems}
        })
        setComponents(newComponents)
    }

    // tag change handler
    const handleTagChange = (targetIndex) => (e) => {
        const newTags = tags.map((tag, tagIndex) => {
            if (targetIndex !== tagIndex) return tag
            return e.target.value
        })
        setTags(newTags)
    }

    // tag add
    const addTag = () => setTags([...tags, ''])

    // tag remove
    const removeTag = (targetIndex) => () => {
        if (tags.length <= 1) {
            console.error('Must have at least one tag.')
        } else {
            setTags(tags.filter((tag, tagIndex) => targetIndex !== tagIndex))
        }
    }

    // submit recipe handler
    const submitRecipe = (e) => {
        e.preventDefault()

        let componentCollection = components.map((component, componentIndex) => {
            return {...component, index_order: componentIndex}
        })

        dataPackage = {
            user_id: currentUser.id,
            title: title,
            description: description,
            components: componentCollection,
            tag_list: tags
        }

        try {
            postRecipe()
        } catch (err) {
            setResult({data: {}, status: 'Error', message: err, submitted: false})        }
    }

    const renderErrors = () => {
        if (result.status === 'Error') {
            return <span>{result.status + ': ' + result.message}</span>
        }
    }

    if (isPostingRecipe) {
        return <span>loading...</span>
    } else if (result.submitted) {
        return <Navigate to={`/recipe/${result.data.id}`} replace />
    } else {
        return(
            <div className='create-recipe-page'>
                <h2>Create Recipe</h2>
                {renderErrors()}
                <form id='create-recipe-form' onSubmit={submitRecipe}>
                    <label>Title</label>
                    <input required type='text' name='title' value={title} onChange={handleTitleChange} />

                    <label>Description</label>
                    <input required type='text' name='description' value={description} onChange={handleDescChange} />

                    <div className='add-component-ribbon'>
                        <button type='button' onClick={addTextbox}>Add Textbox</button>
                        <button type='button' onClick={addUl}>Add Bullet List</button>
                        <button type='button' onClick={addOl}>Add Numbered List</button>
                    </div>

                    <List 
                        values={components.map((component, index) => {
                            switch(component.type) {
                                case 'textbox':
                                    return(
                                        <TextboxForm
                                            key={index}
                                            index={index}
                                            component={component}
                                            handleComponentTitleChange={handleComponentTitleChange} 
                                            handleTextboxTextContentChange={handleTextboxTextContentChange} 
                                            removeComponent={removeComponent} 
                                        />
                                    )
                                case 'ul':
                                    return(
                                        <UlForm 
                                            key={index}
                                            index={index}
                                            component={component}
                                            handleComponentTitleChange={handleComponentTitleChange}
                                            addListItem={addListItem}
                                            handleListItemChange={handleListItemChange}
                                            handleListItemReorder={handleListItemReorder}
                                            removeListItem={removeListItem}
                                            removeComponent={removeComponent}
                                        />
                                    )
                                case 'ol':
                                    return(
                                        <OlForm 
                                            key={index}
                                            index={index}
                                            component={component}
                                            handleComponentTitleChange={handleComponentTitleChange}
                                            addListItem={addListItem}
                                            handleListItemChange={handleListItemChange}
                                            handleListItemReorder={handleListItemReorder}
                                            removeListItem={removeListItem}
                                            removeComponent={removeComponent}
                                        />
                                    )
                                default:
                                    return null
                            }                    
                        })}
                        onChange={({ oldIndex, newIndex }) => setComponents(arrayMove(components, oldIndex, newIndex))}
                        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                        renderItem={({ value, props }) => <li {...props}>{value}</li>}
                    />

                    <TagForm
                        tags={tags}
                        addTag={addTag}
                        handleTagChange={handleTagChange}
                        removeTag={removeTag}
                    />
                </form>

                <input form='create-recipe-form' type='submit' value='Submit Recipe' />
            </div>
        )        
    }
}    

export default CreateRecipe
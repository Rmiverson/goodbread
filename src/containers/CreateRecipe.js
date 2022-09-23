import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import TextboxForm from '../components/TextboxForm'

const CreateRecipe = () => {
    // const [submitted, setSubmitted] = useState(false)
    // const [recipeId, setRecipeId] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [components, setComponents] = useState([])
    const [tags, setTags] = useState([])

    // title handler
    const handleTitleChange = (e) => setTitle(e.target.value)

    // description handler
    const handleDescChange = (e) => setDescription(e.target.value)


    // textboxes, ULs, OLs, and tags should be separated out into individual components 
    // props for each of these should pass down the respective state setters

    // component remove
    const removeComponent = (index) => () => {
        setComponents([components.filter((component, sIndex) => index !== sIndex)])
    }    

    // component title change
    const handleComponentTitleChange = (index) => (e) => {
        const newComponents = components.map((component, sIndex) => {
            if (index !== sIndex) return component
            return {...component, title: e.target.value}
        })
        setComponents(newComponents)
    }


    // textbox add
    const addTextbox = () => {
        setComponents([...components, {type: 'textbox', title: '', text_content: ''}])
    }

    // textbox text content change
    const handleTextboxTextContentChange = (index) => (e) => {
        const newComponents = components.map((component, sIndex) => {
            if (index !== sIndex) return component
            return {...component, text_content: e.target.value}
        })
        setComponents(newComponents)
    }

    // unordered_list add
    const addUl = () => {
        setComponents([...components, {type: 'ul', title:'', list_items: ['']}])
    }

    // ordered_list add
    const addOl = () => {
        setComponents([...components, {type: 'ol', title:'', list_items: ['']}])
    }

    // list_item change handler
    const handleListItemChange = (index, zIndex) => (e) => {
        const newComponents = components.map((component, sIndex) => {
            if (index !== sIndex) return component
            const newComponentListItems = component.list_items.map((list_item, xIndex) => {
            if (zIndex !== xIndex) return list_item
            return e.target.value
            })
            return {...component, list_items: newComponentListItems}
        })
        setComponents(newComponents)
    }

    // list_item add
    const addListItem = (index) => () => {
        const newComponents = components.map((component, sIndex) => {
            if (index !== sIndex) return component
            return {...component, list_items: [...component.list_items, '']}
        })
        setComponents(newComponents)
    }

    // list_item remove
    const removeListItem = (index, zIndex) => () => {
        const newComponents = components.map((component, sIndex) => {
            if (index !== sIndex) return component
            return {...component, list_items: component.list_items.filter((list_item, xIndex) => zIndex !== xIndex)}
        })
        setComponents(newComponents)
    }

    // tag change handler

    // tag add
    // tag remove

    // submit recipe handler
    const submitRecipe = (e) => {
        e.preventDefault()
        let data = {
            title: title,
            description: description,
            components: components,
            tags: tags
        }
        console.log(data)
    }

    // axios/react-query functions to post recipe to api
    // on complete set new recipe id and reroute to the recipes display page

    return(
        <div className='create-recipe-page'>
            <form id='create-recipe-form' onSubmit={submitRecipe}>
                <label>Title</label>
                <input required type='text' name='title' value={title} onChange={handleTitleChange} />

                <label>Description</label>
                <input required type='text' name='description' value={description} onChange={handleDescChange} />

                {/* buttons to add each type of component */}
                <div className='add-component-ribbon'>
                    <button type='button' onClick={addTextbox}>Add Textbox</button>
                    <button type='button' onClick={addUl}>Add Bullet List</button>
                    <button type='button' onClick={addOl}>Add Numbered List</button>
                </div>

                {/* map components here with a switch case */}
                {/* render each component element based on type */}
                {components.map((component, index) => {
                    switch(component.type) {
                        case 'textbox':
                            return(
                                <div key={index} className='textbox-form'>
                                    <label>Text Box Title</label>
                                    <input 
                                        type='text'
                                        placeholder='Title'
                                        value={component.title}
                                        onChange={handleComponentTitleChange(index)}
                                    />

                                    <label>Text Box Content</label>
                                    <input 
                                        type='text'
                                        value={component.text_content}
                                        onChange={handleTextboxTextContentChange(index)}
                                    />
                                    <button type='button' onClick={removeComponent(index)}>-</button>
                                </div>                                
                            )
                        case 'ul':
                            return(
                                <div key={index} className='ul-form'>
                                    <label>Bullet List Title</label>
                                    <input 
                                        type='text'
                                        placeholder='List Title'
                                        value={component.title}
                                        onChange={handleComponentTitleChange(index)}
                                    />

                                    <button type='button' onClick={addListItem(index)}>Add List Item</button>
                                    <ul>
                                        {component.list_items.map((list_item, zIndex) => (
                                        <li key={zIndex}> 
                                            <input 
                                                type='text'
                                                placeholder='Item Text'
                                                value={list_item}
                                                onChange={handleListItemChange(index, zIndex)}
                                            />

                                            <button type='button' onClick={removeListItem(index, zIndex)}>-</button>
                                        </li>
                                        ))}                                        
                                    </ul>

                                    <button type='button' onClick={removeComponent(index)}>Remove Bullet List</button>
                                </div>
                            )
                        case 'ol':
                            return(
                            <div key={index} className='ol-form'>
                                <label>Numbered List Title</label>
                                <input 
                                        type='text'
                                        placeholder='List Title'
                                        value={component.title}
                                        onChange={handleComponentTitleChange(index)}
                                />

                                <button type='button' onClick={addListItem(index)}>Add List Item</button>
                                <ol>
                                    {component.list_items.map((list_item, zIndex) => (
                                        <li key={zIndex}>
                                            <input
                                                type='text'
                                                placeholder='Item Text'
                                                value={list_item}
                                                onChange={handleListItemChange(index, zIndex)}
                                            />

                                            <button type='button' onClick={removeListItem(index, zIndex)}>-</button>
                                        </li>
                                    ))}
                                </ol>

                                <button type='button' onClick={removeComponent(index)}>Remove Numbered List</button>
                            </div>
                            )
                    }                    
                })}
            </form>

            <input form='create-recipe-form' type='submit' value='Submit Recipe' />
            {/* reroute page to newly created recipe */}
        </div>
    )
}    

export default CreateRecipe
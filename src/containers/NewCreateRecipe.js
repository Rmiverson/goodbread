import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CreateRecipe =  () => {
    const [submitted, setSubmitted] = useState(false)
    const [recipeId, setRecipeId] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [components, setComponents] = useState([])
    const [tags, setTags] = useState([])

    /* 
    example JSON input for backend
    [
        {
            "type": "ul",
            "title":"ul_test",
            "list_items":[
                "1",
                "2"    
            ]
        },
        {
            "type": "ol",
            "title":"ol_test",
            "list_items":[
                "1",
                "2"    
            ]
        },
        {
            "type": "textbox",
            "title":"textbox_test",
            "text_content": "test text content."
        }
    ]
    */

    // title handler
    // description handler

    // textbox title change handler
    // textbox text_content change handler
    // textbox add
    // textbox remove

    // unordered_list title change handler
    // unordered_list list_item change handler
    // unordered_list list_item add
    // unordered_list list_item remove
    // unordered_list add
    // unordered_list remove

    // ordered_list title change handler
    // ordered_list list_item change handler
    // ordered_list list_item add
    // ordered_list list_item remove
    // ordered_list add
    // ordered_list remove

    // tag change handler
    // tag add
    // tag remove

    return(
        <div className='create-recipe-page'>
            <form id='create-recipe-form' onSubmit={submitRecipe}>
                <label>Title</label>
                <input required type='text' name='title' />

                <label>Description</label>
                <input required type='text' name='description' />


            </form>

        </div>
    )
}    

export default CreateRecipe
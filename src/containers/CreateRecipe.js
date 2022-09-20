import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
// import { newPostFetch } from '../store/actions/postActions'

const CreateRecipe = () => {
   const [submitted, setSubmitted] = useState(false)
   const [recipeId, setRecipeId] = useState('')
   const [data, setData] = useState({
      contents: [{heading: '', text: ''}],
      ingredients: [{name: '', amount: 0}],
      instructions: [''],
      tags: ['']
   })

   const currentUser = useSelector((state) => state.user)
   const dispatch = useDispatch()

   /* 
   TODO: adjust formatting and inputs to match api schema
        *contents: {heading: "", text: ""} => textbox: {title: "", text_content}
        *ingredients: [{name: "", amount: ""}] => unordered_list: {title: "", list_items: []}
        *instructions: [""] => ordered_list: {title: "", list_items: []}
        *tags: [""] => tags: [{label: ""}]
        *++ description: ""
    TODO: get post working with axios + React-query
    TODO: get navigate to work, and redirect to the created post
   */

//    const updateIdCallback = useCallback(
//       (recipe) => {
//          setPostId(recipe.id)
//          setSubmitted(true)
//       }
//    )   

    // textboxs
    const handleTextboxTitleChange = (index) => (e) => {
        const newTextbox = data.textboxes.map((textbox, sIndex) => {
            if (index !== sIndex) return textbox
            return {...textbox, title: e.target.value}
        })
        setData({...data, textboxes: newTextbox})
    }

    const handleTextboxTextContentChange = (index) => (e) => {
        const newTextbox = data.textboxes.map((textbox, sIndex) => {
            if (index !== sIndex) return textbox
            return {...textbox, text_content: e.target.value}
        })
        setData({...data, textboxes: newTextbox})
    }

    const handleAddTextbox = () => {
        setData({...data, textboxes: [...data.textboxes, {title: '', text_content: ''}]})
    }  

    const handleRemoveTextbox = (index) => () => {
        setData({...data, textboxes: data.textboxes.filter((s, sIndex) => index !== sIndex)})
    }

   // ingredients
    const handleIngredientNameChange = (index) => (e) => {
        const newIngredients = data.ingredients.map((ingredient, sIndex) => {
            if (index !== sIndex) return ingredient
            return {...ingredient, name: e.target.value}
        })
        setData({...data, ingredients: newIngredients})
    }

    const handleIngredientAmountChange = (index) => (e) => {
        const newIngredients = data.ingredients.map((ingredient, sIndex) => {
            if (index !== sIndex) return ingredient
            return {...ingredient, amount: e.target.value}
        })
        setData({...data, ingredients: newIngredients})
    }

    const handleAddIngredient = () => {
        setData({...data, ingredients: [...data.ingredients, {name: '', amount: 0}]})
    }

    const handleRemoveIngredient = (index) => () => {
        setData({...data, ingredients: data.ingredients.filter((s, sIndex) => index !== sIndex)})
    }

    // instructions
    const handleInstructionChange = (index) => (e) => {
        const newInstructions = data.instructions.map((instruction, sIndex) => {
            if (index !== sIndex) return instruction
            return e.target.value
        })
        setData({...data, instructions: newInstructions})
    }

    const handleAddInstruction = () => {
        setData({...data, instructions: [...data.instructions, '']})
    }

    const handleRemoveInstruction = (index) => () => {
        setData({...data, instructions: data.instructions.filter((s, sIndex) => index !== sIndex)})
    }

    // tags
    const handleTagChange = (index) => (e) => {
        const newTags = data.tags.map((tag, sIndex) => {
            if (index !== sIndex) return tag
            return e.target.value            
        })
        setData({...data, tags: newTags})
    }

    const handleAddTag = () => {
        setData({...data, tags: [...data.tags, '']})
    }

    const handleRemoveTag = (index) => () => {
        setData({...data, tags: data.tags.filter((s, sIndex) => index !== sIndex)})
    }



    const renderReRoute = () => {
      return (submitted && <Navigate to={`/recipe/${recipeId}`} />)
   }

    const submitRecipe = (e) => {
        e.preventDefault()

        let recipeData = {
            user_id: currentUser.id,
            title: e.target.title.value,
            contents: data.contents,
            ingredients: data.ingredients,
            instructions: data.instructions,
            tags: data.tags
        }

        console.log(recipeData)
    }

    return (
        <div className='create-recipe-page'>
            <form id='create-recipe-form' onSubmit={submitRecipe}>
                <label>Title</label>
                <input required type='text' name='title' defaultValue=''  />

                {/* content */}
                <label>Text Content</label>
                {data.contents.map((content, index) => (
                    <div key={index} className='content'>
                        <input 
                            type='text'
                            placeholder='heading'
                            value={content.heading}
                            onChange={handleContentsHeadingChange(index)}
                        />
                        <input 
                            type='text'
                            placeholder={'text'}
                            value={content.text}
                            onChange={handleContentsTextChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveContent(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddContent}
                >
                    Add Text Content
                </button>

                {/* ingredients */}
                <label>Ingredients</label>
                {data.ingredients.map((ingredient, index) => (
                    <div key={index} className='ingredient'>
                        <input
                            type='text'
                            placeholder={`Ingredient #${index + 1}`}
                            value={ingredient.name}
                            onChange={handleIngredientNameChange(index)}
                        />
                        <input
                            type='number'
                            placeholder={0}
                            value={ingredient.amount}
                            onChange={handleIngredientAmountChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveIngredient(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddIngredient}
                >
                    Add Ingredient
                </button>

                {/*  Instructions  */}
                <label>instructions</label>
                {data.instructions.map((instruction, index) => (
                    <div key={index} className='instruction'>
                        <input
                            type='text'
                            placeholder={`Instruction #${index + 1}`}
                            value={instruction}
                            onChange={handleInstructionChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveInstruction(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddInstruction}
                >
                    Add Instruction
                </button>

                {/* Tags */}
                <label>Tags</label>
                {data.tags.map((tag, index) => (
                    <div key={index} className='tags'> 
                        <input
                            type='text'
                            placeholder={`Tag #${index + 1}`}
                            value={tag}
                            onChange={handleTagChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveTag(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddTag}
                >
                    Add Tag
                </button>
            </form>   
            
            <input form='create-recipe-form' type='submit' value='Submit Recipe' />
            {/* {renderReRoute()} */}
        </div>
    )
}

export default CreateRecipe
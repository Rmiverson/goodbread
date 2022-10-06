import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCards = (props) => {
    const renderFormbutton = (currentRecipe) => {
        if (props.checkedRecipes.includes(currentRecipe.id)) {
            return <button type='button' onClick={props.handleRemoveRecipe(currentRecipe)}>Remove Recipe</button>
        } else {
            return <button type='button' onClick={props.handleAddRecipe(currentRecipe)}>Add Recipe</button>
        }
    }

    return (
        <div className='card-grid'>
            {props.items.map((item, itemIndex) => {
                if (props.formList === true) {
                    return (
                        <div key={itemIndex}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            {renderFormbutton(item)}
                        </div>
                    )
                } else {
                    return (
                        <Link key={itemIndex} to={`/recipe/${item.id}`}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </Link>                    
                    )
                }
            })}
        </div>
    )
}

export default RecipeCards
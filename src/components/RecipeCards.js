import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCards = (props) => {
    return (
        <div className='card-grid'>
            {props.items.map((item, itemIndex) => {
                if (props.formList === true) {
                    return (
                        <div key={itemIndex}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <button type='button' onClick={props.handleAddRecipe(item)}>Add Recipe</button>
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
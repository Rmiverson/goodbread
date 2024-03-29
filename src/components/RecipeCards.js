import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCards = (props) => {
  const renderFormbutton = (currentRecipe) => {
    if (props.checkedRecipes.includes(currentRecipe.id)) {
      return <button className='content-input-form-delete' type='button' onClick={props.handleRemoveRecipe(currentRecipe)}>Remove Recipe</button>
    } else {
      return <button className='content-add-button' type='button' onClick={props.handleAddRecipe(currentRecipe)}>Add Recipe</button>
    }
  }

  const previewContent = (content) => {
    let str = content
    if (str.length > 250) {
      str = str.substring(0, 90) + '...'
    }
    return str
  }

  return (
    <div className='card-grid'>
      {props.items.map((item, itemIndex) => {
        if (props.formList === true) {
          return (
            <div className='grid-item' key={itemIndex}>
              <h4>{item.title}</h4>
              <p>{previewContent(item.description)}</p>
              {renderFormbutton(item)}
            </div>
          )
        } else {
          return (
            <Link className='grid-item' key={itemIndex} to={`/recipe/${item.id}`}>
              <h4>{item.title}</h4>
              <p>{previewContent(item.description)}</p>
            </Link>
          )
        }
      })}
    </div>
  )
}

export default RecipeCards
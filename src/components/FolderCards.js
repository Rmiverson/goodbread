import React from 'react'
import { Link } from 'react-router-dom'

const FolderCards = (props) => {
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
        return (
          <Link className='grid-item' key={itemIndex} to={`/folder/${item.id}`}> 
            <h4>{item.title}</h4>
            <p>{previewContent(item.description)}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default FolderCards
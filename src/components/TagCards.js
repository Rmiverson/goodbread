import React from 'react'
import { Link } from 'react-router-dom'

const TagCards = (props) => {
  return (
    <div className='card-grid'>
      {props.items.map((item, itemIndex) => {
        return (
          <Link className='grid-item' key={itemIndex + item.Label + item.id} to={`/tag/${item.id}`}>
            <h4>{item.title}</h4>
          </Link>
        )
      })}
    </div>
  )
}

export default TagCards
import React from 'react'
import { Link } from 'react-router-dom'

const FolderCards = (props) => {
    return (
        <div className='card-list'>
            {props.items.map((item, itemIndex) => {
                return (
                    <Link className='list-item' key={itemIndex} to={`/folder/${item.id}`}> 
                        <h4>{item.title}</h4>
                    </Link>                    
                )       
            })}
        </div>
    )
}

export default FolderCards
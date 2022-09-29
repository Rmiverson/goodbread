import React from 'react'
import { Link } from 'react-router-dom'

const FolderCard = (props) => {
    return (
        <Link to={`/folder/${props.item.id}`} className='folder-card'> 
            <h4>{props.item.title}</h4>
            <p>{props.item.description}</p>            
        </Link>
    )
}

export default FolderCard
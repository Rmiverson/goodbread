import React from 'react'
import { Link } from 'react-router-dom'

const FolderCards = (props) => {
    return (
        <div className='card-grid'>
            {props.items.map((item, itemIndex) => {
                return (
                    <Link key={itemIndex} to={`/folder/${item.id}`} className='folder-card'> 
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>            
                    </Link>                    
                )       
            })}
        </div>
    )
}

export default FolderCards
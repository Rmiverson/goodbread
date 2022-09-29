import React from 'react'
import FolderCard from './FolderCard'

const CardGrid = (props) => {
    return (
        <div className='card-grid'>
            {/* {console.log(props.items)} */}
            {props.items.map((item, itemIndex) => {
                return <FolderCard key={itemIndex} item={item}/>
            })}
        </div>
    )
}

export default CardGrid
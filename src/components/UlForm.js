import React from 'react'

const UlForm = (props) => {
    return(
        <div className='ul-form'>
            <label>Bullet List Title</label>
            <input 
                type='text'
                placeholder='List Title'
                value={props.component.title}
                onChange={props.handleComponentTitleChange(props.index)}
            />

            <button type='button' onClick={props.addListItem(props.index)}>Add List Item</button>
            <ul>
                {props.component.list_items.map((list_item, zIndex) => (
                    <li key={zIndex}> 
                        <input 
                            type='text'
                            placeholder='Item Text'
                            value={list_item}
                            onChange={props.handleListItemChange(props.index, zIndex)}
                        />

                        <button type='button' onClick={props.removeListItem(props.index, zIndex)}>-</button>
                    </li>
                ))}                                        
            </ul>

            <button type='button' onClick={props.removeComponent(props.index)}>Remove Bullet List</button>
        </div> 
    )
}

export default UlForm
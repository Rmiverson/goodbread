import React from 'react'

const UlForm = (props) => {
    return(
        <>  
            <label>Bullet List Title</label>
            <input 
                type='text'
                placeholder='List Title'
                value={props.component.title}
                onChange={props.handleComponentTitleChange(props.index)}
            />

            <button type='button' onClick={props.addListItem(props.index)}>Add List Item</button>
            <ul>
                {props.component.list_items.map((list_item, listItemIndex) => (
                    <li key={listItemIndex}>
                        <button type='button' onClick={props.handleListItemReorder(props.index, listItemIndex, -1)}>^</button>
                        <button type='button' onClick={props.handleListItemReorder(props.index, listItemIndex, 1)}>v</button>
                        <input 
                            type='text'
                            placeholder='Item Text'
                            value={list_item}
                            onChange={props.handleListItemChange(props.index, listItemIndex)}
                        />

                        <button type='button' onClick={props.removeListItem(props.index, listItemIndex)}>-</button>
                    </li>
                ))}                                        
            </ul>

            <button type='button' onClick={props.removeComponent(props.index)}>Remove Bullet List</button>
        </> 
    )
}

export default UlForm
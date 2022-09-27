import React from 'react'

const OlForm = (props) => {
    return(
        <li className='ol-form'>
            <div>[~]</div>
            <label>Numbered List Title</label>
            <input 
                type='text'
                placeholder='List Title'
                value={props.component.title}
                onChange={props.handleComponentTitleChange(props.index)}
            />

            <button type='button' onClick={props.addListItem(props.index)}>Add List Item</button>
            <ol>
                {props.component.list_items.map((list_item, listItemIndex) => (
                    <li key={listItemIndex}>
                        <input
                            type='text'
                            placeholder='Item Text'
                            value={list_item}
                            onChange={props.handleListItemChange(props.index, listItemIndex)}
                        />

                        <button type='button' onClick={props.removeListItem(props.index, listItemIndex)}>-</button>
                    </li>
                ))}
            </ol>

            <button type='button' onClick={props.removeComponent(props.index)}>Remove Numbered List</button>
        </li>
    )
}

export default OlForm
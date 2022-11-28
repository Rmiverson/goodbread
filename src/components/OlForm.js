import React from 'react'
import {HiMenu} from "react-icons/hi"

const OlForm = (props) => {
    return(
        <>
            <div className='grab-icon'><HiMenu /></div>
            <div className='content-input-form'>
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
                </ol>

                <button type='button' onClick={props.removeComponent(props.index)}>Remove Numbered List</button>           
            </div>
        </>
    )
}

export default OlForm
import React from 'react'
import { HiMenu, HiChevronUp, HiChevronDown, HiOutlineX } from "react-icons/hi"

const UlForm = (props) => {
    return(
        <> 
            <div className='grab-icon'><HiMenu /></div>
            <div className='content-input-form'>
                <label>Bullet List Title</label>
                <input 
                    type='text'
                    placeholder='List Title'
                    value={props.component.title}
                    onChange={props.handleComponentTitleChange(props.index)}
                />

                <ul>
                    {props.component.list_items.map((list_item, listItemIndex) => (
                        <li key={listItemIndex}>
                            <button className='list-control-up' type='button' onClick={props.handleListItemReorder(props.index, listItemIndex, -1)}><HiChevronUp /></button>
                            <button className='list-control-down' type='button' onClick={props.handleListItemReorder(props.index, listItemIndex, 1)}><HiChevronDown /></button>
                            <input 
                                type='text'
                                placeholder='Item Text'
                                value={list_item}
                                onChange={props.handleListItemChange(props.index, listItemIndex)}
                            />

                            <button className='list-control-delete' type='button' onClick={props.removeListItem(props.index, listItemIndex)}><HiOutlineX /></button>
                        </li>
                    ))}

                    <button type='button' onClick={props.addListItem(props.index)}>Add List Item</button>                                 
                </ul>

                <button type='button' onClick={props.removeComponent(props.index)}>Remove Bullet List</button>
            </div> 
        </> 
    )
}

export default UlForm
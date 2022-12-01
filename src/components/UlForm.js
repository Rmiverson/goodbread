import React from 'react'
import { HiMenu, HiChevronUp, HiChevronDown, HiOutlineX } from "react-icons/hi"

const UlForm = (props) => {
    return(
        <> 
            <div className='grab-icon'><HiMenu /></div>
            <div className='content-input-form'>
                <h4>Bullet List</h4>
                <label>List Title</label>
                <input 
                    type='text'
                    placeholder='List Title'
                    value={props.component.title}
                    onChange={props.handleComponentTitleChange(props.index)}
                />

                <ul>
                    {props.component.list_items.map((list_item, listItemIndex) => (
                        <li key={listItemIndex}>
                            <div className='content-input-list-item'>
                                <button className='content-input-list-control-up' type='button' onClick={props.handleListItemReorder(props.index, listItemIndex, -1)}><HiChevronUp /></button>
                                <button className='content-input-list-control-down' type='button' onClick={props.handleListItemReorder(props.index, listItemIndex, 1)}><HiChevronDown /></button>
                                <input 
                                    type='text'
                                    placeholder='Item'
                                    value={list_item}
                                    onChange={props.handleListItemChange(props.index, listItemIndex)}
                                />

                                <button className='content-input-list-control-delete' type='button' onClick={props.removeListItem(props.index, listItemIndex)}><HiOutlineX /></button>                                
                            </div>
                        </li>
                    ))}

                    <button className='content-input-list-add' type='button' onClick={props.addListItem(props.index)}>Add List Item</button>                                 
                </ul>

                <button className='content-input-form-delete' type='button' onClick={props.removeComponent(props.index)}>Remove Bullet List</button>
            </div> 
        </> 
    )
}

export default UlForm
import React from 'react'
import { HiOutlineX } from "react-icons/hi"

const TagForm = (props) => {
  return(
    <div className='tag-form'>
      <label>Tags</label>
      <ul>
        {props.tags.map((tag, index) => (
          <li key={index}>
            <input 
              type='text'
              placeholder='Tag Name'
              value={tag.label}
              onChange={props.handleTagChange(index)}
              required
            />
            <button className='content-input-list-control-delete' type='button' onClick={props.removeTag(index)}><HiOutlineX /></button>
          </li>
        ))}
        <button className='content-add-button' type='button' onClick={props.addTag}>Add Tag</button>
      </ul>
    </div>
  )
}

export default TagForm
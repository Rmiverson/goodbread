import React from 'react'

const TagForm = (props) => {
    return(
        <div className='tag-form'>
            <label>Tags</label>
            <button type='button' onClick={props.addTag}>Add Tag</button>
            <ul>
                {props.tags.map((tag, index) => (
                    <li key={index}>
                        <input 
                            type='text'
                            placeholder='tag name'
                            value={tag.label}
                            onChange={props.handleTagChange(index)}
                        />
                        <button type='button' onClick={props.removeTag(index)}>-</button>
                    </li>
                ))}
            </ul>            
        </div>
    )
}

export default TagForm
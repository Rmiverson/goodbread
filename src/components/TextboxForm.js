import React from 'react'

const TextboxForm = (props) => {
    return (
        <li className='textbox-form'>
            <div>[~]</div>
            <label>Text Box Title</label>
            <input 
                type='text'
                placeholder='Title'
                value={props.component.title}
                onChange={props.handleComponentTitleChange(props.index)}
            />

            <label>Text Box Content</label>
            <input 
                type='text'
                value={props.component.text_content}
                onChange={props.handleTextboxTextContentChange(props.index)}
            />
            <button type='button' onClick={props.removeComponent(props.index)}>Remove Text Box</button>
        </li>      
    )
}

export default TextboxForm
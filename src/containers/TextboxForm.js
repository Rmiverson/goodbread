import React from 'react'

const TextboxForm = (props) => {
    return (
        <div key={props.key} className='textbox-form'>
            <input 
                type='text'
                placeholder='Title'
                value={props.title}
                onChange={props.handleTextboxTitleChange}
            />
            <input 
                type='text'
                value={props.text_content}
                onChange={props.handleTextboxTextContentChange}
            />
            <button type='button' onClick={props.removeTextbox}>-</button>
        </div>
    )
}

export default TextboxForm
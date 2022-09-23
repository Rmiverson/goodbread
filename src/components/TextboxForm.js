import React from 'react'

const TextboxForm = (props) => {
    return (
        <div key={index} className='textbox-form'>
            <label>Text Box Title</label>
            <input 
                type='text'
                placeholder='Title'
                value={component.title}
                onChange={handleComponentTitleChange(index)}
            />

            <label>Text Box Content</label>
            <input 
                type='text'
                value={component.text_content}
                onChange={handleTextboxTextContentChange(index)}
            />
            <button type='button' onClick={removeComponent(index)}>-</button>
        </div>      
    )
}

export default TextboxForm
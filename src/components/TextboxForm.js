import React from 'react'
import {HiMenu} from "react-icons/hi"

const TextboxForm = (props) => {
    return (
        <>
            <div className='grab-icon'><HiMenu /></div>
            <div className='content-input-form'>
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
            </div>
        </>      
    )
}

export default TextboxForm
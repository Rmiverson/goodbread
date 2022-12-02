import React from 'react'
import {HiMenu} from "react-icons/hi"

const TextboxForm = (props) => {
    return (
        <>
            <div className='grab-icon'><HiMenu /></div>
            <div className='content-input-form'>
                <h4>Text Box</h4>

                <div className='input-section'>
                    <label>Title</label>
                    <input 
                        type='text'
                        value={props.component.title}
                        onChange={props.handleComponentTitleChange(props.index)}
                    />                    
                </div>

                <div className='input-section'>
                    <label>Content</label>
                    <textarea
                        rows='6'
                        cols='50'
                        value={props.component.text_content}
                        onChange={props.handleTextboxTextContentChange(props.index)}
                    />                    
                </div>

                <button className='content-input-form-delete' type='button' onClick={props.removeComponent(props.index)}>Remove Text Box</button>
            </div>
        </>      
    )
}

export default TextboxForm
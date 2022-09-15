import React from 'react'

const SignupForm = (props) => {
    return(
        <div className='SignupForm'>
            <h2>Signup</h2>
            <form onSubmit={props.handleSubmit}>
                <label>Username</label>
                <input 
                    name='username'
                    placeholder='Username'
                    value={props.username}
                    onChange={props.handleChange}
                    required
                />

                <label>Email</label>
                <input 
                    name='email'
                    placeholder='Email'
                    type='email'
                    value={props.email}
                    onChange={props.handleChange}
                    required
                />

                <label>Password</label>
                <input 
                    name='password'
                    placeholder='Password'
                    type='password'
                    value={props.password}
                    onChange={props.handleChange}
                    minLength='6'
                    required
                />

                <input type='submit' className='submit-button' value='Login'/>
            </form>
        </div>        
    )
}

export default SignupForm
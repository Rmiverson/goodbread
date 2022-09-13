import React from 'react'

const SignupForm = (props) => {
    return(
        <div className='SignupForm'>
            <h2>Signup</h2>
            <form onSubmit={props.handleSignupSubmit}>
                <label>Username</label>
                <input 
                    name='username'
                    placeholder='Username'
                    value={props.handleSignupChange}
                    onChange={props.handleSignupChange}
                    required
                />

                <label>Email</label>
                <input 
                    name='email'
                    placeholder='Email'
                    type='email'
                    onChange={props.handleSignupChange}
                    required
                />

                <label>Password</label>
                <input 
                    name='password'
                    placeholder='Password'
                    type='password'
                    value={props.password}
                    onChange={props.handleSignupChange}
                    required
                />

                <input type='submit' className='submit-button' value='Login'/>
            </form>
        </div>        
    )
}

export default SignupForm
import React from 'react'

const LoginForm = (props) => {
    return(
        <div className='LoginForm'>
            <h2>Login</h2>
            <form onSubmit={props.handleLoginSubmit}>
                <label>Username</label>
                <input 
                    name='username'
                    placeholder='Username'
                    value={props.handleLoginChange}
                    onChange={props.handleLoginChange}
                    required
                />

                <label>Password</label>
                <input 
                    name='password'
                    placeholder='Password'
                    type='password'
                    value={props.password}
                    onChange={props.handleLoginChange}
                    required
                />

                <input type='submit' className='submit-button' value='Login'/>
            </form>
        </div>
    )
}

export default LoginForm
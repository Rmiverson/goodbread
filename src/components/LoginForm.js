import React from 'react'

const LoginForm = (props) => {
    return(
        <div className='login'>
            <h2>Login</h2>
            <form id='login-form' onSubmit={props.handleSubmit}>
                <div className='input-section'>
                    <label>Username</label>
                    <input 
                        name='username'
                        placeholder='Username'
                        value={props.username}
                        onChange={props.handleChange}
                        required
                    />
                </div>  

                <div className='input-section'>
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
                </div> 
            </form>

            <input form='login-form' type='submit' className='submit-button' value='Login'/>
        </div>
    )
}

export default LoginForm
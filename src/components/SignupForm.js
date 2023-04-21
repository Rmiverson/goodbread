import React from 'react'

const SignupForm = (props) => {
  return(
    <div className='signup'>
      <h2>Signup</h2>
      <form id='signup-form' onSubmit={props.handleSubmit}>
        <div className='input-row'>
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
            <label>Email</label>
            <input 
              name='email'
              placeholder='Email'
              type='email'
              value={props.email}
              onChange={props.handleChange}
              required
            />
          </div>
        </div>

        <div className='input-section'>
          <label>Password</label>
          <input 
            form='signup-form'
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
      <input form='signup-form' type='submit' className='submit-button' value='Signup'/>
    </div>
  )
}

export default SignupForm
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { userLogin, userSignup } from '../store/actions/userActions'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const Login = () => {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [signupUsername, setSignupUsername] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLoginChange = (e) => {
        if (e.target.name === 'username') {
            setLoginUsername(e.target.value)
        } else if (e.target.name === 'password') {
            setLoginPassword(e.target.value)
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({
            username: loginUsername,
            password: loginPassword
        }))
    }

    const handleSignupChange = (e) => {
        if (e.target.name === 'username') {
            setSignupUsername(e.target.value)
        } else if (e.target.name === 'email') {
            setSignupEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setSignupPassword(e.target.value)
        }
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        dispatch(userSignup({
            username: signupUsername,
            email: signupEmail,
            password: signupPassword
        }))
    }

    if (!!user.id) {
        return <Redirect to='/' />
    } else {
        return (
            <div className='LoginSignup'>
                <h2>Login & Signup</h2>
                <LoginForm handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} username={loginUsername} password={loginPassword}/>
                <SignupForm handleChange={handleSignupChange} handleSubmit={handleSignupSubmit} username={signupUsername} email={signupEmail} password={signupPassword} />
            </div>
        )
    }

}

export default Login
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from 'react-router-dom'
import { userLogin, userSignup } from '../store/actions/userActions'

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

    const handleSignupChange = (e) {
        if (e.target.name === 'username') {
            setSignupUsername(e.target.value)
        } else if (e.target.name === 'email') {
            setSignupEmail(e.target.value)
        }
    }

    return (
        <div className='Login'>
            <h2>Login & Signup</h2>
        </div>
    )
}

export default Login
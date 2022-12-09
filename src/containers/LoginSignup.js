import React, { useState } from 'react'
import '../scss/login-signup.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { updateUser } from '../redux/actions'
import { useMutation } from 'react-query'
import apiClient from '../http-common'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const Login = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null})
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [signupUsername, setSignupUsername] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { isLoading: isPostingUserLogin, mutate: postUserLogin } = useMutation(
        async () => {
            return await apiClient.post('/login', {user: {username: loginUsername, password: loginPassword}})
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null})
                dispatch(updateUser(apiResp.data))
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err})
            }
        }
    )

    const { isLoading: isPostingUserSignup, mutate: postUserSignup } = useMutation(
        async () => {
            return await apiClient.post('/signup', { user: { username: signupUsername, email: signupEmail, password: signupPassword } })
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null})
                dispatch(updateUser(apiResp.data))
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err})
            }
        }
    )

    const handleLoginChange = (e) => {
        if (e.target.name === 'username') {
            setLoginUsername(e.target.value)
        } else if (e.target.name === 'password') {
            setLoginPassword(e.target.value)
        }
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

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        postUserLogin()
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        postUserSignup()
    }

    const renderErrors = () => {
        if (result.status === 'Error') {
            return <span>{result.status + ': ' + result.message}</span>
        }
    }

    if (isPostingUserLogin || isPostingUserSignup) {
        return <span>Loading...</span>
    } else if (!!user.id) {
        return <Navigate to='/' replace/>
    } else {
        return (
            <div className='login-signup-page'>
                <h2>GoodBread</h2>
                {renderErrors()}
                <div className='login-signup-components'>
                    <LoginForm handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} username={loginUsername} password={loginPassword}/>
                    <SignupForm handleChange={handleSignupChange} handleSubmit={handleSignupSubmit} username={signupUsername} email={signupEmail} password={signupPassword} />
                </div>
           </div>
        )
    }

}

export default Login
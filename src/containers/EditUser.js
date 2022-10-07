import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import apiClient from '../http-common'

const EditUser = () => {
    const currentUser = useSelector((state) => state.user)
    const [result, setResult] = useState({data: {}, status: null, message: null, submitted: false})
    const [first_name, setFirst_name] = useState(currentUser.first_name)
    const [last_name, setLast_name] = useState(currentUser.last_name)
    const [description, setDescription] = useState(currentUser.description)

    let dataPackage = {}

    const { isLoading: isPuttingUser, mutate: putUser } = useMutation(
        async () => {
            return await apiClient.put(`/users/${currentUser.id}`, {user: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
        },
        {
            onSuccess: (res) => {
                const apiResp = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data
                }
                setResult({data: apiResp.data, status: apiResp.status, message: null, submitted: true})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err, submitted: false})
            }
        }
    )

    const handleFirstNameChange = (e) => setFirst_name(e.target.value)

    const handleLastNameChange = (e) => setLast_name(e.target.value)

    const handleDescriptionChange = (e) => setDescription(e.target.value)

    const submitUser = (e) => {
        e.preventDefault()

        dataPackage = {
            id: currentUser.id,
            first_name: first_name,
            last_name: last_name,
            description: description
        }

        try {
            putUser()
        } catch (err) {
            setResult({data: {}, status: 'Error', message: err, submitted: false})
        }
    }

    const renderErrors = () => {
        if (result.status === 'Error') {
            return <span>{result.status + ': ' + result.message}</span>
        }
    }

    if (isPuttingUser) {
        return <span>Loading...</span>
    } else if (result.submitted) {
        return <Navigate to='/profile' replace />
    } else {
        return (
            <div className='edit-user-page'>
                <h2>Edit Profile</h2>
                {renderErrors()}
                <form id='edit-user-form' onSubmit={submitUser}>
                    <label>First Name</label>
                    <input type='text' name='first_name' value={first_name} onChange={handleFirstNameChange} />

                    <label>Last Name</label>
                    <input type='text' name='last_name' value={last_name} onChange={handleLastNameChange} />

                    <label>Description</label>
                    <textarea name='description' value={description} onChange={handleDescriptionChange} />

                    <input type='submit' value='Submit Profile' />
                </form>
            </div>
        )
    }
}

export default EditUser
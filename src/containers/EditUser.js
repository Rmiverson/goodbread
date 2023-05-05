import '../scss/edit-profile.scss'
import React, { useState } from 'react'
import apiClient from '../http-common'
import { useMutation } from 'react-query'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/actions'

import Error from '../components/Error'
import Loading from '../components/Loading'

const EditUser = () => {
  const currentUser = useSelector((state) => state.user)
  const [result, setResult] = useState({data: {}, status: null, message: null, submitted: false})
  const [first_name, setFirst_name] = useState(currentUser.first_name)
  const [last_name, setLast_name] = useState(currentUser.last_name)
  const [description, setDescription] = useState(currentUser.description)
  const dispatch = useDispatch()
  let dataPackage = {}

  const { isLoading: isPuttingUser, mutate: putUser } = useMutation(
    async () => {
      return await apiClient.put(`/users/${currentUser.id}`, {user: dataPackage}, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
        setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}, submitted: false})
      }
    }
  )

  const { isLoading: isDeletingUser, mutate: deleteUser } = useMutation(
    async () => {
      return await apiClient.delete(`/users/${currentUser.id}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
        setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}, submitted: false})
      }
    }
  )
  
  const handleDelete = () => {
    let warning = "Are you sure you want to delete?\nThis is irreversable and will delete all recipes, folders, and user data.\nClick OK to delete or Cancel."
    if (window.confirm(warning) === true) {
      dispatch(userLogout)
      deleteUser()
    }
  }

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
      return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
    }
  }

  if (isPuttingUser || isDeletingUser) {
    return <Loading />
  } else if (result.submitted) {
    return <Navigate to='/profile' replace />
  } else if (result.deleted) {
    return <Navigate to='/login-signup' replace/>
  } else {
    return (
      <div className='edit-user-page'>
        <h2>Edit Profile</h2>
        {renderErrors()}
        <form id='edit-user-form' onSubmit={submitUser}>
          <div className='input-section'>
            <label>First Name</label>
            <input type='text' name='first_name' value={first_name} onChange={handleFirstNameChange} />
          </div>

          <div className='input-section'>
            <label>Last Name</label>
            <input type='text' name='last_name' value={last_name} onChange={handleLastNameChange} />
          </div>

          <div className='input-section'>
            <label>Description</label>
            <textarea name='description' value={description} onChange={handleDescriptionChange} rows='4' cols='45'/>                        
          </div>

          <div className='form-mortality-controls'>
            <input className='form-delete-button' type='button' onClick={handleDelete} value='Delete User Profile' />
            <input className='form-submit-button' type='submit' value='Update Profile' />
          </div>
        </form>
      </div>
    )
  }
}

export default EditUser
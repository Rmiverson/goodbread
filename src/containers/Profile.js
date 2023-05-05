import React, { useEffect, useState } from 'react'
import apiClient from '../http-common'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Error from '../components/Error'
import Loading from '../components/Loading'

const Profile = () => {
  const currentUser = useSelector((state) => state.user)
  const [result, setResult] = useState({data: {}, status: null, message: null})

  const { isLoading: isLoadingUser, refetch: getUserById } = useQuery(
    'query-user-by-id',
    async () => {
      return await apiClient.get(`/users/${currentUser.id}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        const apiResp = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data
        }
        setResult({data: apiResp.data, status: apiResp.status, message: null})
      },
      onError: (err) => {
        console.error(err.response?.data || err)
        setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}})
      }
    }
  )

  useEffect(() => {
    function ferretUserById() {
      try {
        getUserById()
      } catch (err) {
        console.error(err)
        setResult({data: {}, status: 'Error', message: err})
      }
    }

    ferretUserById()
  }, [getUserById, setResult])

  if (isLoadingUser || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='profile-page'>
        <h2>{`${result.data.username}'s Profile`}</h2>

        <div className='content-section'>
          <h4>Name</h4>
          <p>{`${result.data.first_name} ${result.data.last_name}`}</p>
        </div>
        
        <div className='content-section'>
          <h4>User About</h4>
          <p>{result.data.description}</p>
        </div>

        <div className='content-section'>
          <h4>Email</h4>
          <p>{result.data.email}</p>
        </div>
        
        <div className='content-section'>
          <h4>User Since</h4>
          <p>{Date(result.data.created_at)}</p>
        </div>

        <Link className='button' to='/profile/edit'>Edit Profile</Link>
      </div>
    )
  }
}

export default Profile
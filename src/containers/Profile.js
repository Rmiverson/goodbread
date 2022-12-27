import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import apiClient from '../http-common'
import { updateUser } from '../redux/actions'

const Profile = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null})
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { isLoading: isLoadingUser, refetch: getUserById } = useQuery(
        'query-user-by-id',
        async () => {
            return await apiClient.get(`/users/${currentUser.id}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
                dispatch(updateUser(apiResp.data))
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err})
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
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
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
                    <h4>Statistics</h4>
                    <p>{`Number of Recipes: ${result.data.recipes.length}`}</p>
                    <p>{`Number of Folders: ${result.data.folders.length}`}</p>                    
                </div>

                <Link className='button' to='/profile/edit'>Edit Profile</Link>
            </div>
        )        
    }
}

export default Profile
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
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

    if (isLoadingUser || !result.data) {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='Profile'>
                <h2>{`${result.data.username}'s Profile`}</h2>
                <h4>{`Name: ${result.data.first_name} ${result.data.last_name}`}</h4>
                <h4>User description</h4>
                <p>{result.data.description}</p>
                <h4>{`Number of Recipes: ${result.data.recipes.length}`}</h4>
                <h4>{`Number of Folders: ${result.data.folders.length}`}</h4>
            </div>
        )        
    }
}

export default Profile
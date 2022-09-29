import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import apiClient from '../http-common'

const Folder = () => {
    const [result, setResult] = useState({status: 'Loading...'})
    const currentUser = useSelector((state) => state.user)
    const { id } = useParams()

    const {isLoading: isLoadingFolder, refetch: getFolderById } = useQuery(
        'query-folder-by-id',
        async () => {
            return await apiClient.get(`/folders/${id}`, { headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
        },
        {
            enabled: false,
            retry: 1,
            onSuccess: (res) => {
                const result = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data
                }
                console.log(result)
                setResult(result)
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({status: 'Error', message: err.response?.data || err})
            }
        }
    )

    useEffect(() => {
        if (isLoadingFolder) setResult({status: 'Loading...'})
    }, [isLoadingFolder])

    useEffect(() => {
        function ferretFolderById() {
            if (id) {
                try{
                    getFolderById()
                } catch (err) {
                    console.error(err)
                    setResult({status: 'Error', message: err})
                }
            }
        }

        ferretFolderById()
    }, [getFolderById, setResult, id])

    if (result.status === 'Loading...') {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='Folder'>
                <h2>{result.data.title}</h2>
                <p>{result.data.description}</p>
            </div>
        )        
    }

}

export default Folder
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import apiClient from '../http-common'

const Folder = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null})
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
                const apiResp = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data.data,
                    meta: res.data.meta
                }
                // console.log(apiResp)
                setResult({data: apiResp.data, status: apiResp.status, message: null})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err})
            }
        }
    )

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

    if (isLoadingFolder) {
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
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import apiClient from '../http-common'
import SubFolderRecipes from './SubFolderRecipes'

const SubFolder = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null})
    const currentUser = useSelector((state) => state.user)
    const { id } = useParams()

    const { isLoading: isLoadingSubFolder, refetch: getSubFolderById } = useQuery(
        'query-sub-folder-by-id',
        async () => {
            return await apiClient.get(`/sub_folders/${id}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
                setResult({data: apiResp.data, status: apiResp.status, message: null})
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err})
            }
        }
    )

    useEffect(() => {
        function ferretSubFolderById() {
            if (id) {
                try {
                    getSubFolderById()
                } catch (err) {
                    console.error(err)
                    setResult({status: 'Error', message: err})
                }
            }
        }

        ferretSubFolderById()
    }, [getSubFolderById, setResult, id])

    if (isLoadingSubFolder) {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='sub-folder'>
                <h2>{result.data.title}</h2>
                <p>{result.data.description}</p>
                <Link to='/recipe/create'>Create Recipe</Link>
                <SubFolderRecipes subFolderId={id} currentUser={currentUser} />
            </div>      
        )
    }
}

export default SubFolder
import '../scss/folder.scss'
import React, { useState, useEffect } from 'react'
import apiClient from '../http-common'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

import FolderRecipes from './FolderRecipes'
import Error from '../components/Error'
import Loading from '../components/Loading'

const Folder = () => {
  const currentUser = useSelector((state) => state.user)
  const { id } = useParams()
  const [result, setResult] = useState({data: {}, status: null, message: null})

  const { isLoading: isLoadingFolder, refetch: getFolderById } = useQuery(
    'query-folder-by-id',
    async () => {
      return await apiClient.get(`/folders/${id}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
        setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}})
      }
    }
  )

  useEffect(() => {
    function ferretFolderById() {
      if (id) {
        try {
          getFolderById()
        } catch (err) {
          console.error(err)
          setResult({status: 'Error', message: err})
        }
      }
    }

    ferretFolderById()
  }, [getFolderById, setResult, id])

  if (isLoadingFolder || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='folder'>
        <div className='head-content'>
          <h2>{result.data.title}</h2>
          <p>{result.data.description}</p>
          <div className='link-ribbon'>
            <Link className='link-buttons' to='/recipe/create'>Create Recipe</Link>
            <Link className='link-buttons' to={`/folder/edit/${id}`}>Edit Folder</Link>
          </div>
        </div>
        <FolderRecipes folderId={id} currentUser={currentUser} />
      </div>
    )
  }
}

export default Folder
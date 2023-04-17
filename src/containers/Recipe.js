import '../scss/recipe.scss'
import React, { useState, useEffect } from 'react'
import apiClient from '../http-common'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

import Error from '../components/Error'
import Loading from '../components/Loading'

const Recipe = () => {
  const currentUser = useSelector((state) => state.user)
  const { id } = useParams()
  const [result, setResult] = useState({data: {}, status: null, message: null})

  const { isLoading: isLoadingRecipe, refetch: getRecipeById } = useQuery(
    'query-recipe-by-id',
    async () => {
      return await apiClient.get(`/recipes/${id}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
    function ferretRecipeById() {
      if (id) {
        try {
          getRecipeById()
        } catch (err) {
          setResult(err)
        }
      }
    }

    ferretRecipeById()
  }, [getRecipeById, setResult, id])

  if (isLoadingRecipe || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='recipe'>
        <h2 className='recipe-title'>{result.data.title}</h2>
        <Link className='button' to={`/recipe/edit/${id}`} >Edit</Link>
        <p className='recipe-desc'>{result.data.description}</p>

        <div className='recipe-content'> 
          <div dangerouslySetInnerHTML={{__html: result.data.bodyText}}/>
        </div>

        <div className='recipe-tag-list'>
          <h4>Tags:</h4>
          {result.data.tags.map((tag, index) => (
            <p key={index}>{tag.label}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default Recipe
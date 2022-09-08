import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import apiClient from '../http-common'

const Recipe = (props) => {
    const [result, setResult] = useState('loading...')

    const { id } = useParams()

    const { isLoading: isLoadingRecipe, refetch: getRecipeById } = useQuery(
        'query-recipe-by-id',
        async () => {
            return await apiClient.get(`/recipes/${id}`)
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
                setResult(result)
            },
            onError: (err) => {
                setResult(err.response?.data || err)
            }
        }
    )

    useEffect(() => {
        if (isLoadingRecipe) setResult("loading...")
    }, [isLoadingRecipe])

    useEffect(() => {
        ferretRecipeById()
    }, [])

    function ferretRecipeById() {       
        if (id) {
            try {
                getRecipeById()
            } catch (err) {
                setResult(err)
            }
        }
    }

    console.log(result)

    if (result === 'loading...') {
        return (
            <span>Loading...</span>
        )
    } else {
        return (
            <div className='Recipe'>
                <h2>{result.data.title}</h2>
                <p>{result.data.description}</p>
            </div>
        )        
    }

}

export default Recipe
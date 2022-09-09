import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import apiClient from '../http-common'

const Recipe = () => {
    const [result, setResult] = useState('loading...')
    const [dataComponents, setDataComponents] = useState([])
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
                setDataComponents([result.data.unordered_lists, result.data.ordered_lists, result.data.textboxes].flat())
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
                {dataComponents.map((dataComponent, index) => (
                    <div key={index}>
                        <h4>{dataComponent.title}</h4>
                    </div>
                ))}
            </div>
        )        
    }

}

export default Recipe
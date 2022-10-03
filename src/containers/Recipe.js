import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import apiClient from '../http-common'

const Recipe = () => {
    const [result, setResult] = useState({data: {}, status: null, message: null})
    const [dataComponents, setDataComponents] = useState([])
    const currentUser = useSelector((state) => state.user)
    const { id } = useParams()

    const { isLoading: isLoadingRecipe, refetch: getRecipeById } = useQuery(
        'query-recipe-by-id',
        async () => {
            return await apiClient.get(`/recipes/${id}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
                setDataComponents([apiResp.data.unordered_lists, apiResp.data.ordered_lists, apiResp.data.textboxes].flat().sort((a, b) => (a.index_order - b.index_order)))
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: {}, status: 'Error', message: err.response?.data || err})
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
        return (
            <span>Loading...</span>
        )
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='Recipe'>
                <h2>{result.data.title}</h2>
                <p>{result.data.description}</p>
                {dataComponents.map((dataComponent, index) => {
                    switch(dataComponent.component_type) {
                        case 'textbox':
                            return (
                                <div key={index}>
                                    <h4>{dataComponent.title}</h4>
                                    <p>{dataComponent.text_content}</p>
                                </div>
                            )
                        case 'ul':
                            return (
                                <div key={index}>
                                    <h4>{dataComponent.title}</h4>
                                    <ul>
                                        {dataComponent.list_items.map((list_item, list_item_index) => {
                                            return <li key={list_item_index}>{list_item}</li>
                                        })}
                                    </ul>
                                </div>
                            )
                        case 'ol':
                            return (
                                <div key={index}>
                                    <h4>{dataComponent.title}</h4>
                                    <ol>
                                        {dataComponent.list_items.map((list_item, list_item_index) => {
                                            return <li key={list_item_index}>{list_item}</li>
                                        })}
                                    </ol>
                                </div>
                            )
                        default:
                            return (<>{console.error('Error: Unknown component type')}</>)
                            
                    }
                })}
                <ul className='tag-list'>
                    {result.data.tags.map((tag, index) => (
                        <li key={index}>{tag.label}</li>
                    ))}
                </ul>
            </div>
        )        
    }

}

export default Recipe
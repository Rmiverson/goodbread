import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import RecipeCards from '../components/RecipeCards'
import apiClient from '../http-common'
import { Link } from 'react-router-dom'

const Recipes = (props) => {
    const currentUser = props.currentUser
    const [result, setResult] = useState({data: [], status: null, message: null})
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const { isLoading: isLoadingRecipes, refetch: getAllUserRecipes } = useQuery(
        'query-all-user-recipes',
        async () => {
            return await apiClient.get(`/users/${currentUser.id}/recipes/?page=${currentPage + 1}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
                setResult({data: apiResp.data, status: apiResp.status, message: res.statusText})
                setPageCount(apiResp.meta.total_pages)
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                setResult({data: [], status: 'Error', message: err.response?.data || err})
            }
        }
    )

    useEffect(() => {
        function ferretRecipes() {
            try {
                getAllUserRecipes()
            } catch (err) {
                console.error(err)
                setResult({data: [], status: 'Error', message: err})  
            }
        }

        ferretRecipes()
    }, [getAllUserRecipes, currentPage])

    const handlePageClick = (e) => {
        setCurrentPage(e.selected)
    }

    if (isLoadingRecipes || !result.status) {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='all-recipes'>
                <h2>All Recipes</h2>
                <Link to='/recipe/create'>Create Recipe</Link>
                <div className='all-recipes-list'>
                    <RecipeCards items={result.data} handleAddRecipe={props.handleAddRecipe} formList={props.formList} handleRemoveRecipe={props.handleRemoveRecipe} checkedRecipes={props.checkedRecipes}/>
                    <ReactPaginate 
                        breakLabel='...'
                        nextLabel='next >'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel='< previous'
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        )        
    }
}

export default Recipes
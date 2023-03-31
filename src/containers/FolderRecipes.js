import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import RecipeCards from '../components/RecipeCards'
import apiClient from '../http-common'
import Error from '../components/Error'
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi"
import Loading from '../components/Loading'

const FolderRecipes = (props) => {
    const currentUser = props.currentUser
    const [result, setResult] = useState({data: [], status: null, message: null}) 
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const id = props.folderId

    const { isLoading: isLoadingFolderRecipes, refetch: getFolderRecipes } = useQuery(
        'query-all-folder-recipes',
        async () => {
            return await apiClient.get(`/folders/${id}/recipes?page=${currentPage + 1}`, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
                setResult({data: [], status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}})
            }
        }
    )

    useEffect(() => {
        function ferretFolderRecipes() {
            try {
                getFolderRecipes()
            } catch (err) {
                console.error(err)
                setResult({data: [], status: 'Error', message: err})
            }
        }

        ferretFolderRecipes()
    }, [getFolderRecipes, currentPage])

    const handlePageClick = (e) => setCurrentPage(e.selected)

    if (isLoadingFolderRecipes || !result.status) {
        return <Loading />
    } else if (result.status === 'Error') {
        return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
    } else {
        return (
            <div className='folder-recipes'>
                <h2>Recipes</h2>
                <RecipeCards items={result.data} formList={props.formList} handleAddRecipe={props.handleAddRecipe}/>
                <ReactPaginate
                    className='page-controls'
                    breakLabel='...'
                    nextLabel={<HiOutlineChevronRight />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={<HiOutlineChevronLeft />}
                    renderOnZeroPageCount={null}
                />
            </div>
        )
    }
}

export default FolderRecipes
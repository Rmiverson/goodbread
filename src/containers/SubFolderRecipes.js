import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import RecipeCards from '../components/RecipeCards'
import apiClient from '../http-common'

const SubFolderRecipes = (props) => {
    const currentUser = props.currentUser
    const [result, setResult] = useState({data: [], status: null, message: null}) 
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const id = props.subFolderId

    const { isLoading: isLoadingSubFolderRecipes, refetch: getSubFolderRecipes } = useQuery(
        'query-all-sub-folder-recipes',
        async () => {
            return await apiClient.get(`/sub_folders/${id}/recipes?page=${currentPage + 1}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
        function ferretSubFolderRecipes() {
            try {
                getSubFolderRecipes()
            } catch (err) {
                console.error(err)
                setResult({data: [], status: 'Error', message: err})
            }
        }

        ferretSubFolderRecipes()
    }, [getSubFolderRecipes, currentPage])

    const handlePageClick = (e) => setCurrentPage(e.selected)

    if (isLoadingSubFolderRecipes) {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='sub-folder-recipes'>
                <h2>Recipes</h2>
                <RecipeCards items={result.data} formList={false} />
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
        )
    }
}

export default SubFolderRecipes
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import FolderCards from '../components/FolderCards'
import apiClient from '../http-common'
import { Link } from 'react-router-dom'

const Folders = (props) => {
    const currentUser = props.currentUser
    const [result, setResult] = useState({data: [], status: null, message: null})
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const { isLoading: isLoadingFolders, refetch: getAllUserFolders } = useQuery(
        'query-all-user-folders',
        async () => {
            return await apiClient.get(`/users/${currentUser.id}/folders/?page=${currentPage + 1}`, { headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
        function ferretUserFolders() {
            try {
                getAllUserFolders()
            } catch (err) {
                console.error(err)
                setResult({data: [], status: 'Error', message: err})                    
            }
        }
        ferretUserFolders()
    }, [getAllUserFolders, currentPage])

    const handlePageClick = (e) => setCurrentPage(e.selected)

    if (isLoadingFolders || !result.status) {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='all-folders'>
                <h2>Folders</h2>
                <Link to='/folder/create'>Create Folder</Link>
                <FolderCards items={result.data} />
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

export default Folders
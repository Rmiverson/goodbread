import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import SubFolderCards from '../components/SubFolderCards'
import apiClient from '../http-common'

const SubFolders = (props) => {
    const currentUser = props.currentUser
    const [result, setResult] = useState({data: [], status: null, message: null})
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const parentFolderId = props.folderId

    const { isLoading: isLoadingSubFolders, refetch: getAllFoldersSubFolders } = useQuery(
        'query-all-folders-sub-folders',
        async () => {
            return await apiClient.get(`/folders/${parentFolderId}/sub_folders/?page=${currentPage + 1}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
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
            }
        }
    )

    useEffect(() => {
        function ferretFolderSubFolders() {
            try {
                getAllFoldersSubFolders()
            } catch (err) {
                console.error(err)
                setResult({data: [], status: 'Error', message: err})    
            }
        }

        ferretFolderSubFolders()
    }, [getAllFoldersSubFolders, currentPage])

    const handlePageClick = (e) => setCurrentPage(e.selected)

    if (isLoadingSubFolders || !result.status) {
        return <span>Loading...</span>
    } else if (result.status === 'Error') {
        return <span>{result.status + ': ' + result.message}</span>
    } else {
        return (
            <div className='all-folders'>
                <h2>Sub-Folders</h2>
                <SubFolderCards folderId={parentFolderId} items={result.data} />
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

export default SubFolders
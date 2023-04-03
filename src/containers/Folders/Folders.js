import './folders.scss'
import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import FolderCards from '../../components/FolderCards'
import apiClient from '../../http-common'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi"
import Loading from '../../components/Loading'

const Folders = () => {
  const currentUser = useSelector((state) => state.user)
  const [result, setResult] = useState({data: [], status: null, message: null})
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const { isLoading: isLoadingFolders, refetch: getAllUserFolders } = useQuery(
    'query-all-user-folders',
    async () => {
      return await apiClient.get(`/users/${currentUser.id}/folders/?page=${currentPage + 1}`, { headers: {'Authorization': `Bearer ${currentUser.token}`}})
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

  const renderCards = (data) => {
    if (data.length >= 1) {
      return <FolderCards items={data} />
    } else {
      return <p>No folders here yet</p>
    }
  }

  const handlePageClick = (e) => setCurrentPage(e.selected)

  if (isLoadingFolders || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='folders'>
        <h2>Folders</h2>
        <Link className='button' to='/folder/create'>Create Folder</Link>
        <div className='folders-grid'>
          {renderCards(result.data)}
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
      </div>
    )
  }
}

export default Folders
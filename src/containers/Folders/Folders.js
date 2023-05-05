import './folders.scss'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import apiClient from '../../http-common'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"

import FolderCards from '../../components/FolderCards'
import SearchForm from '../../components/SearchForm'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const Folders = () => {
  const currentUser = useSelector((state) => state.user)
  const [result, setResult] = useState({data: [], status: null, message: null})
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [sort, setSort] = useState('date_asc')

  const {isLoading: isLoadingSearchFolders, mutate: postSearchFolders} = useMutation(
    async () => {
      return await apiClient.post(`/folders/search/?page=${currentPage + 1}`, {folder: {user_id: currentUser.id, query: searchInput, sort: sort}}, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
    },
    {
      onSuccess: (res) => {
        const apiResp = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data.data,
          meta: res.data.meta
        }
        setResult({data: apiResp.data, status: apiResp.status, message: res.statusText})
        setPageCount(apiResp.meta.total_pages)
        setSort('date_asc')
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
        postSearchFolders()
      } catch (err) {
        console.error(err)
        setResult({data: [], status: 'Error', message: err})                    
      }
    }
    ferretUserFolders()
  }, [postSearchFolders, currentPage])

  const renderCards = (data) => {
    if (data.length >= 1) {
      return <FolderCards items={data} />
    } else {
      return <p>No folders here yet</p>
    }
  }

  const handlePageClick = (e) => setCurrentPage(e.selected)

  const handleSearchChange = (e) => setSearchInput(e.target.value)

  const handleSortChange = (e) => setSort(e.target.value)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setPageCount(0)
      postSearchFolders()
    } catch (err) {
      setResult({data: {}, status: 'Error', message: err})
    }
  }

  if (isLoadingSearchFolders || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='folders'>
        <h2>Folders</h2>

        <SearchForm searchInput={searchInput} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} handleSortChange={handleSortChange} />

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
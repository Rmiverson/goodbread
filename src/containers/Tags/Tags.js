import './Tags.scss'
import React, { useEffect, useState } from 'react'
import apiClient from '../../http-common'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import SearchForm from '../../components/SearchForm'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import TagCards from '../../components/TagCards'

const Tags = () => {
  const currentUser = useSelector((state) => state.user)
  const [result, setResult] = useState({data: [], status: null, message: null})
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')

  const { isLoading: isLoadingSearchTags, mutate: postSearchTags } = useMutation(
    async () => {
      return await apiClient.post(`/tags/search/?page=${currentPage + 1}`, {tag: {user_id: currentUser.id, query: searchInput}}, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
      },
      onError: (err) => {
        console.error(err.response?.data || err)
        setResult({data: [], status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}})
      }
    }
  )

  useEffect(() => {
    function ferretTags() {
      try {
        postSearchTags()
      } catch (err) {
        console.error(err)
        setResult({data: [], status: 'Error', message: err})  
      }
    }

    ferretTags()
  }, [postSearchTags, currentPage])

  const renderCards = (data) => {
    if (data.length >= 1) {
      return <TagCards items={data} />
    } else {
      return <p>No tags created yet.</p>
    }
  }

  const handlePageChange = (e) => setCurrentPage(e.selected)

  const handleSearchChange = (e) => setSearchInput(e.target.value)

  const handleSearchSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setPageCount(0)
      postSearchTags()
    } catch (err) {
      setResult({data: {}, status: 'Error', message: err})
    }
  }

  if (isLoadingSearchTags || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='tags'>
        <h2>Recipe Tags</h2>

        <SearchForm searchInput={searchInput} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} />

        <Link className='button' to='/recipe/create'>Create Recipe</Link>
        <div className='tags-grid'>
          {renderCards(result.data)}
          <ReactPaginate 
            className='page-controls'
            breakLabel='...'
            nextLabel={<HiOutlineChevronRight />}
            onPageChange={handlePageChange}
            forcePage={currentPage}
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

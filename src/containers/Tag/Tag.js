import './Tag.scss'
import React, { useState, useEffect } from 'react'
import apiClient from '../../http-common'
import ReactPaginate from 'react-paginate'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import SearchForm from '../../components/SearchForm'
import RecipeCards from '../../components/RecipeCards'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const Tag = () => {
  const currentUser = useSelector((state) => state.user)
  const { id } = useParams()
  const [result, setResult] = useState({data: {}, status: null, message: null})
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  let { state } = useLocation()
  const { isLoading: isLoadingTag, mutate: postSearchRecipesInTag } = useMutation(
    'query-recipes-in-tag',
    async () => {
      return await apiClient.post(`/tags/${id}/recipe_search`, {tag: {user_id: currentUser.id, query: searchInput}}, { headers: {'Authorization': `Bearer ${currentUser.token}`}})
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
        setPageCount(apiResp.meta.total_pages)
      },
      onError: (err) => {
        console.error(err.response?.data || err)
        setResult({data: {}, status: 'Error', message: {error: err.response.data.error, status: err.response.status, statusText: err.response.statusText}})
      }
    }
  )

  useEffect(() => {
    function ferretSearchRecipesInTag() {
      if (id) {

        try {
          postSearchRecipesInTag()
        } catch (err) {
          setResult(err)
        }
      }
    }

    ferretSearchRecipesInTag()
  }, [postSearchRecipesInTag, setResult, id])

  const renderCards = (data) => {
    if (data.length >= 1) {
      return <RecipeCards
        items={data}
        handleAddRecipe={null} 
        formList={false} 
        handleRemoveRecipe={null} 
        checkedRecipes={null}
      />
    } else {
      return <p>No recipes here yet</p>
    }
  }

  const handlePageChange = (e) => setCurrentPage(e.selected)

  const handleSearchChange = (e) => setSearchInput(e.target.value)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setPageCount(0)
      postSearchRecipesInTag()
    } catch (err) {
      setResult({data: {}, status: 'Error', message: err})
    }
  }

  if (isLoadingTag || !result.status) {
    return <Loading />
  } else if (result.status === 'Error') {
    return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='tag'>
        <h3>{state.label}</h3>

        <SearchForm searchInput={searchInput} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} />

        <div className='recipes-grid'>
          {renderCards(result.data)}
          <ReactPaginate 
            className='page-controls'
            breakLabel='...'
            nextLabel={<HiOutlineChevronRight />}
            onPageChange={handlePageChange}
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

export default Tag
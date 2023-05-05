import './Recipes.scss'
import React, { useEffect, useState } from 'react'
import apiClient from '../../http-common'
import ReactPaginate from 'react-paginate'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import SearchForm from '../../components/SearchForm'
import RecipeCards from '../../components/RecipeCards'
import Loading from '../../components/Loading'
import Error from '../../components/Error'

const Recipes = (props) => {
  const currentUser = useSelector((state) => state.user)
  const [result, setResult] = useState({data: [], status: null, message: null})
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [sort, setSort] = useState('date_asc')

  const {isLoading: isLoadingSearchRecipes, mutate: postSearchRecipes } = useMutation(
    async () => {
      return await apiClient.post(`/recipes/search/?page=${currentPage + 1}`, {recipe: {user_id: currentUser.id, query: searchInput, sort: sort}}, {headers: {'Authorization': `Bearer ${currentUser.token}`}})
    },
    {
      onSuccess: (res) => {
        const apiResp = {
          status: res.status + '-' + res.statusText,
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
    function ferretRecipes() {
      try {
        postSearchRecipes()
      } catch (err) {
        console.error(err)
        setResult({data: [], status: 'Error', message: err})  
      }
    }

    ferretRecipes()
  }, [postSearchRecipes, currentPage])

  const renderCards = (data) => {
    if (data.length >= 1) {
      return <RecipeCards
        items={data}
        handleAddRecipe={props.handleAddRecipe} 
        formList={props.formList} 
        handleRemoveRecipe={props.handleRemoveRecipe} 
        checkedRecipes={props.checkedRecipes}
      />
    } else {
      return <p>No recipes here yet</p>
    }
  }

  const handlePageChange = (e) => setCurrentPage(e.selected)

  const handleSearchChange = (e) => setSearchInput(e.target.value)

  const handleSortChange = (e) => {
    setSort(e.target.value)
    console.log(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setPageCount(0)

      postSearchRecipes()
    } catch (err) {
      setResult({data: {}, status: 'Error', message: err})
    }
  }

  if (isLoadingSearchRecipes || !result.status) {
      return <Loading />
  } else if (result.status === 'Error') {
      return <Error error={result.message.error} status={result.message.status} statusText={result.message.statusText} currentUser={currentUser}/>
  } else {
    return (
      <div className='recipes'>
        <h2>Recipes</h2>

        {/* only renders the search form if it is not a part of the create folder component. */}
        {props.formList ? <></> : <SearchForm searchInput={searchInput} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} handleSortChange={handleSortChange} />}

        <Link className='button' to='/recipe/create'>Create Recipe</Link>
        <div className='recipes-grid'>
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

export default Recipes
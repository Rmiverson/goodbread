import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const Recipes = (props) => {
    const itemsPerPage = 4
    const currentUser = props.currentUser

    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)

    const [itemOffSet, setItemOffSet] = useState(0)

    useEffect(() => {

        const endOffSet = itemOffSet + itemsPerPage

        console.log(`Loading items from ${itemOffSet} to ${endOffSet}`)
        
        setCurrentItems(items.slice(itemOffSet, endOffSet))
        
        setPageCount(Math.ceil(items.length / itemsPerPage))
    }, [itemOffSet, itemsPerPage])

    const handlePageClick = (e) => {
        const newOffSet = (e.selected * itemsPerPage) % items.length
        console.log(`User requested page number ${e.selected}, which is offset ${newOffSet}`)
        setItemOffSet(newOffSet)
    }

    const renderItems = (items) => {
        return (
            <>
                {items && 
                    items.map((item, index) => (
                        <div key={index}>
                            <h4>Item #{item}</h4> 
                        </div>
                    ))
                }                
            </>
        )
    }

    return (
        <div className='all-recipes'>
            <h2>All Recipes</h2>
            <div className='all-recipes-list'>
                {renderItems(currentItems)}
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

export default Recipes
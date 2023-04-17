import React from 'react'
import '../scss/loading.scss'

const Loading = () => {
  return (
    <div className='loading'>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
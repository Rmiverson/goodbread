import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../redux/actions'

const Error = (props) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout)
  }

  if (props.status === 401 && props.currentUser) {
    handleLogout()
  } else {
    return (
      <div className='error'>
        <h5>{props.status}: {props.statusText}</h5>
        <p>{props.error}</p>
      </div>
    )
  }
}

export default Error
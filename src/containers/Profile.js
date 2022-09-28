import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const currentUser = useSelector((state) => state.user)

    return (
        <div className='Profile'>
            <h2>Profile</h2>
            {console.log(currentUser)}
        </div>
    )
}

export default Profile
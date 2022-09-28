import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import Recipes from './Recipes'

import apiClient from '../http-common'
import { userUpdate, userLogout } from '../redux/actions'

const Home = () => {
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { isLoading: isLoadingUser, refetch: getUser } = useQuery(
        'query-user-by-id',
        async () => {
            return await apiClient.get(`/users/${currentUser.id}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
        },
        {
            enabled: false,
            retry: 1,
            onSuccess: (res) => {
                const result = {
                    status: res.status + '-' + res.statusText,
                    headers: res.headers,
                    data: res.data                    
                }

                dispatch(userUpdate(result.data))
            },
            onError: (err) => {
                console.error(err.response?.data || err)
                dispatch(userLogout())
            }
        }
    )

    useEffect(() => {
        function ferretUserById() {
            try {
                getUser()
            } catch (err) {
                console.error(err)
                dispatch(userLogout())
            }
        }

        ferretUserById()
    }, [getUser, dispatch])

    if (isLoadingUser) {
        return <span>Loading...</span>
    } else {
        return(
            <div className='Home'>
                <h2>Home</h2>
                {currentUser.recipes.map((recipe, index) => (
                    <Link key={index} to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                ))}
                <Link to='/create-recipe'>Create Recipe</Link>
            </div>
        )        
    }
}

export default Home
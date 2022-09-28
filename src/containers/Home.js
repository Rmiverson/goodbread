import React, { useEffect } from 'react'
// import { useQuery } from 'react-query'
import { useSelector } from 'react-redux' //useDispatch
import { Link } from 'react-router-dom'

import Recipes from './Recipes'
// import apiClient from '../http-common'
// import { userUpdate, userLogout } from '../redux/actions'

const Home = () => {
    const currentUser = useSelector((state) => state.user)
    // const dispatch = useDispatch()

    // TODO: make a call fetching all recipes w/ pagination
    // TODO: make a call for folders w/ pagination
    // TODO: make a way to make new folders and route to them
    // TODO: ^^ same with sub-folders
    // TODO: work out profile page
    // TODO: work out folder page
    // TODO: work out sub-folder page
    // TODO: add ways to edit: recipes, folders, sub-folder, user
    // TODO: in the edit pages, add ways to delete that resource
    // TODO: strait out error handling and make it more useful for the user
    // TODO: get started on styling
    
    // const { isLoading: isLoadingUser, refetch: getUser } = useQuery(
    //     'query-user-by-id',
    //     async () => {
    //         return await apiClient.get(`/users/${currentUser.id}`, {headers: {'Authorization': `Bearer ${currentUser.token.token}`}})
    //     },
    //     {
    //         enabled: false,
    //         retry: 1,
    //         onSuccess: (res) => {
    //             const result = {
    //                 status: res.status + '-' + res.statusText,
    //                 headers: res.headers,
    //                 data: res.data                    
    //             }

    //             dispatch(userUpdate(result.data))
    //         },
    //         onError: (err) => {
    //             console.error(err.response?.data || err)
    //             dispatch(userLogout())
    //         }
    //     }
    // )

    // useEffect(() => {
    //     function ferretUserById() {
    //         try {
    //             getUser()
    //         } catch (err) {
    //             console.error(err)
    //             dispatch(userLogout())
    //         }
    //     }

    //     ferretUserById()
    // }, [getUser, dispatch])


    return(
        <div className='Home'>
            <h2>Home</h2>
            {/* {currentUser.recipes.map((recipe, index) => (
                <Link key={index} to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            ))} */}
            <Link to='/create-recipe'>Create Recipe</Link>
            <Recipes currentUser={currentUser} />
        </div>
    )        
}

export default Home
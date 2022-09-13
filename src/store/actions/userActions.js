// import { useMutation, useQuery } from 'react-query'
import apiClient from '../../http-common'

const API = 'http://localhost:3000/'

// original fetch for signup
// export const userSignup = (user) => {
//     return async dispatch => {
//         try {
//            const resp = await fetch(API + 'sign_up', {
//               method: 'POST',
//               headers: {
//                  'Content-Type': 'application/json',
//                  Accept: 'application/json'
//               },
//               body: JSON.stringify({ user: user })
//            })
//            const data = await resp.json()
//            localStorage.setItem('token', data.token)
//            dispatch(loginUser(data))
//         } catch (error) {
//            console.error('Error:', error)
//         }
//      }
// }


// react query & axios (i have no idea if this will work)
// const { isLoading: isPostingUser, mutate: postUser } = useMutation(
//     async (user) => {
//         return await apiClient.post(`/users`, JSON.stringify({ user: user }))
//     },
//     {
//         onSuccess: (res) => {
//             const result = {
//                 status: res.status + '-' + res.statusText,
//                 headers: res.headers,
//                 data: res.data
//             }

//             localStorage.setItem(res.data.token)

//             return result
//         },    
//         onError: (err) => {
//             return err.response?.data || err
//         }
//     }
// )

export function userSignup(user) {
   
   return async dispatch => {
      try {
         return await apiClient
            .post('/users', JSON.stringify({ user: user }))
            .then((response) => {
               let data = response.json()
               console.log(data)
               dispatch(signupUser(data))
            })
      } catch (err) {
         console.error(err)
      }
   }
}

export const userLogin = (user) => {
    return async dispatch => {
        try {
           const resp = await fetch(API + 'login', {
              method: 'POST',
              headers: {
                 'Content-Type': 'application/json',
                 Accept: 'application/json'
              },
              body: JSON.stringify(user)
           })
           const data = await resp.json()
           localStorage.setItem('token', data.token)
           dispatch(loginUser(data))
        } catch (error) {
           console.error('Error:', error)
        }
     }
}

export const userPersist = () => {
    return async dispatch => {
       const token = localStorage.token
       if (token) {
          try {
             const resp = await fetch(API + 'persist', {
                method: 'GET',
                headers: {
                   Authorization: `Bearer ${token}`
                },
             })
             const data = await resp.json()
             dispatch(loginUser(data))
          } catch (error) {
             localStorage.removeItem('token')
             console.error('Error:', error)
          }  
       }
    }
 }

 export const signupUser = (userObj) => ({
   type: 'SIGNUP_USER',
   payload: userObj
 })

 export const loginUser = (userObj) => ({
    type: 'LOGIN_USER',
    payload: userObj
 })
 
 export const logoutUser = () => ({
    type: 'LOGOUT_USER'
 })
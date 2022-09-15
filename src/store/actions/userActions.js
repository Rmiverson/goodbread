// import { useMutation, useQuery } from 'react-query'
import apiClient from '../../http-common'

export function userSignup(user) {   
   return async dispatch => {
      try {
         return await apiClient
            .post('/signup', JSON.stringify({ user: user }))
            .then((response) => {
               let data = response.data
               console.log(response)
               localStorage.setItem('token', data.token.token)
               dispatch(signupUser(data))
            })
      } catch (err) {
         console.error(err)
      }
   }
}

export function userLogin(user) {
   return async dispatch => {
      try {
         return await apiClient
            .post('/login', JSON.stringify({ user: user }))
            .then(( response ) => {
               let data = response.data
               console.log(response)
               localStorage.setItem('token', data.token.token)
               localStorage.setItem('token_exp', data.token.exp)
               dispatch(loginUser(data))
            })
      } catch (err) {
         console.error(err)
      }
   }
}

export function userPersist() {
   return async dispatch => {
      const token = localStorage.token
      const d = new Date()
      const current_time = d.getTime()

      if (token || localStorage.token_exp < current_time) {
         try {
            return await apiClient
               .get('/persist', {headers: {Authorization: `Bearer ${token}`}})
               .then(( response ) => {
                  let data = response.data
                  console.log(data)
                  dispatch(loginUser(data))
               })
         } catch (err) {
            localStorage.removeItem('token')
            console.error(err)
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
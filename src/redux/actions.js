import apiClient from '../http-common'

export function userSignup(user) {   
   return async dispatch => {
      try {
         return await apiClient
            .post('/signup', JSON.stringify({ user: user }))
            .then((response) => {
               let data = response.data
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
               dispatch(loginUser(data))
            })
      } catch (err) {
         console.error(err)
      }
   }
}

export function userLogout(dispatch) {dispatch(logoutUser())}

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
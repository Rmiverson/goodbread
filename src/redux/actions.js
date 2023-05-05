export function userUpdate(user) {return async dispatch => dispatch(updateUser(user))}

export function userLogout(dispatch) {return dispatch(logoutUser())}
 
export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const updateUser = (userObj) => ({
  type: 'UPDATE_USER',
  payload: userObj
})
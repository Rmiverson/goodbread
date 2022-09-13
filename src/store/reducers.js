export const initialState = {
    user: {}
}

export default function reducer( state = initialState, action) {
    switch (action.type) {
        case 'SIGNUP_USER':
            return {...state, user: action.payload}
        case 'LOGIN_USER':
            return {...state, user: action.payload}
         case 'LOGOUT_USER':
            return {...state, user: {}}
        default:
            return state
    }
}
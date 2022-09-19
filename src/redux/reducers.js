import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig = {
    key: 'root',
    storage
}

export const initialState = {
    user: {}
}

export function appReducer( state = initialState, action) {
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

export const persistedReducer = persistReducer(persistConfig, appReducer)
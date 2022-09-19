import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig = {
    key: 'root',
    storage
}

export const initialState = {
    user: {}
}

export const appReducer = ( state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_USER':
            return {...state, user: action.payload}
        case 'LOGIN_USER':
            return {...state, user: action.payload}
        default:
            return state
    }
}

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        console.log('hit')
        storage.removeItem('persist:root')
        return appReducer(undefined, action)
    }
    
    return appReducer(state, action)
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
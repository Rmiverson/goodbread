import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'

const saveToLocalStorage = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state))
    } catch (error) {
        console.error(error)
    }
}

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state')
        return stateStr ? JSON.parse(stateStr) : undefined
    } catch (error) {
        console.error(error)
        return undefined
    }
}

const persistedStore = loadFromLocalStorage()

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    }, persistedStore
)

store.subscribe(() => {
    saveToLocalStorage(store.getState())
})

export default store
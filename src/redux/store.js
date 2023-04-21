import { configureStore } from '@reduxjs/toolkit'
import { persistedReducer } from './reducers'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)
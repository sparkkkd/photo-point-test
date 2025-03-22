import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productsSlice'

const rootReducer = combineReducers({
	productSlice,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productsSlice'
import categorySlice from './slices/categorySlice'

const rootReducer = combineReducers({
	productSlice,
	categorySlice,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

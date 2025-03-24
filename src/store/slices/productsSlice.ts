import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICartProduct, IProduct } from '../../models/product.model'
import { AxiosError } from 'axios'
import { ProductService } from '../../api/Services/ProductService'

interface IInitialState {
	products: IProduct[]
	isLoading: boolean
	isError: boolean
	cart: ICartProduct[]
}

const initialState: IInitialState = {
	products: [],
	isLoading: false,
	isError: false,
	cart: [],
}

export const getAllProducts = createAsyncThunk(
	'products/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const response = await ProductService.getAll()
			return response.data
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) return rejectWithValue(error.message)
		}
	}
)

export const getProductsByCategory = createAsyncThunk(
	'products/getByCategory',
	async (category: string, { rejectWithValue }) => {
		try {
			const response = await ProductService.getByCategory(category)
			return response.data
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) return rejectWithValue(error.message)
		}
	}
)

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addToCart: (state, action: { payload: IProduct }) => {
			const currentItem = state.cart.find(
				(product) => product.id === action.payload.id
			)
			if (currentItem) {
				state.cart.find((item) => item.id === action.payload.id)!.count += 1
			} else {
				state.cart.push({ ...action.payload, count: 1 })
			}
		},
		removeAllFromCart: (state, action: { payload: number }) => {
			state.cart = state.cart.filter((product) => product.id !== action.payload)
		},
		removeOneFromCart: (state, action: { payload: number }) => {
			const currentItem = state.cart.find(
				(product) => product.id === action.payload
			)

			if (currentItem?.count === 1) {
				state.cart = state.cart.filter(
					(product) => product.id !== action.payload
				)
			} else {
				state.cart.find((item) => item.id === action.payload)!.count -= 1
			}
		},
		filterProducts: (
			state,
			action: { payload: 'higher' | 'lower' | 'az' | 'za' }
		) => {
			if (action.payload === 'higher') {
				state.products.sort((a, b) => b.price - a.price)
			} else if (action.payload === 'lower') {
				state.products.sort((a, b) => a.price - b.price)
			} else if (action.payload === 'az') {
				state.products.sort((a, b) => a.title.localeCompare(b.title))
			} else if (action.payload === 'za') {
				state.products.sort((a, b) => b.title.localeCompare(a.title))
			}
		},
	},
	extraReducers: (builder) => {
		// Start getAllProducts
		builder.addCase(getAllProducts.pending, (state) => {
			state.isError = false
			state.isLoading = true
		})
		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			if (action.payload) {
				state.products = action.payload
				state.isError = false
				state.isLoading = false
			}
		})
		builder.addCase(getAllProducts.rejected, (state) => {
			state.isError = true
			state.isLoading = false
		})
		// End getAllProducts

		// Start getProductsByCategory
		builder.addCase(getProductsByCategory.pending, (state) => {
			state.isError = false
			state.isLoading = true
		})
		builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
			if (action.payload) {
				state.products = action.payload
				state.isError = false
				state.isLoading = false
			}
		})
		builder.addCase(getProductsByCategory.rejected, (state) => {
			state.isError = true
			state.isLoading = false
		})
		// End getProductsByCategory
	},
})

export default productSlice.reducer
export const {
	addToCart,
	removeAllFromCart,
	removeOneFromCart,
	filterProducts,
} = productSlice.actions

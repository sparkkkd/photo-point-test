import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../models/product.model'
import { AxiosError } from 'axios'
import { ProductService } from '../../api/Services/ProductService'

interface IInitialState {
	products: IProduct[]
	isLoading: boolean
	isError: boolean
	cart: IProduct[]
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

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
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
	},
})

export default productSlice.reducer

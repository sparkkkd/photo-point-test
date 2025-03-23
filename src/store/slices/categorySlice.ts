import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoryService } from '../../api/Services/CategoryService'
import { AxiosError } from 'axios'

interface IInitialState {
	isLoading: boolean
	isError: boolean
	categories: string[]
	activeCategory: string
}

const initialState: IInitialState = {
	isLoading: false,
	isError: false,
	categories: [],
	activeCategory: 'All',
}

export const getAllCategories = createAsyncThunk(
	'products/getAllCategories',
	async (_, { rejectWithValue }) => {
		try {
			const response = await CategoryService.getAll()
			return response.data
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) return rejectWithValue(error.message)
		}
	}
)

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		toggleActiveCategory: (state, action: { payload: string }) => {
			state.activeCategory = action.payload
		},
	},
	extraReducers: (builder) => {
		// Start getAllCategories
		builder.addCase(getAllCategories.pending, (state) => {
			state.isError = false
			state.isLoading = true
		})
		builder.addCase(getAllCategories.fulfilled, (state, action) => {
			if (action.payload) {
				state.categories = action.payload
				state.isError = false
				state.isLoading = false
			}
		})
		builder.addCase(getAllCategories.rejected, (state) => {
			state.isError = true
			state.isLoading = false
		})
		// End getAllCategories
	},
})

export default categorySlice.reducer

export const { toggleActiveCategory } = categorySlice.actions

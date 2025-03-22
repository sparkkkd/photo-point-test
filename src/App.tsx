import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { MainPage } from './pages/MainPage'
import { CartPage } from './pages/CartPage'
import { ProductPage } from './pages/ProductPage'

import { Header } from './modules/Header/Header'

function App() {
	return (
		<Provider store={store}>
			<Header />

			<Routes>
				<Route path='/' index element={<MainPage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/product/:id' element={<ProductPage />} />
			</Routes>
		</Provider>
	)
}

export default App

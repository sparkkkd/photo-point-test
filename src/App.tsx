import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { MainPage } from './pages/MainPage'
import { CartPage } from './pages/CartPage'
import { ProductPage } from './pages/ProductPage'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter basename='/photopoint'>
				<Routes>
					<Route path='/' index element={<MainPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route path='/product/:id' element={<ProductPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App

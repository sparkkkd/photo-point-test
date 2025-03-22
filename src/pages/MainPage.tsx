import { FC, useEffect } from 'react'
import { Container } from '../components/Container/Container'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getAllProducts } from '../store/slices/productsSlice'
import { ProductCard } from '../components/ProductCard/ProductCard'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
	const dispatch = useAppDispatch()
	const { products } = useAppSelector((state) => state.productSlice)

	useEffect(() => {
		dispatch(getAllProducts())
	}, [])

	console.log(products)

	return (
		<div>
			<Container>
				<h2 className='text-3xl font-bold text-center'>Catalog</h2>

				<div className='flex flex-row flex-wrap gap-3.5'>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
			</Container>
		</div>
	)
}

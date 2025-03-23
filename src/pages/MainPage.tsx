import { FC, useEffect } from 'react'
import { Container } from '../components/Container/Container'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getAllProducts } from '../store/slices/productsSlice'
import { ProductCard } from '../components/ProductCard/ProductCard'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
	const dispatch = useAppDispatch()
	const { products } = useAppSelector((state) => state.productSlice)
	const { activeCategory } = useAppSelector((state) => state.categorySlice)

	useEffect(() => {
		dispatch(getAllProducts())
	}, [])

	return (
		<div className='mt-25'>
			<Container>
				<h2 className='text-6xl mb-7 uppercase tracking-widest font-bold text-center font-[Julius_Sans_One]'>
					Catalog
				</h2>

				<div className='text-2xl mb-5 text-center first-letter:uppercase'>
					{activeCategory}
				</div>

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

import { FC, useEffect, useState } from 'react'
import { Container } from '../components/Container/Container'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getAllProducts } from '../store/slices/productsSlice'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { Filter } from '../components/Filter/Filter'
import { IProduct } from '../models/product.model'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
	const dispatch = useAppDispatch()
	const { products } = useAppSelector((state) => state.productSlice)
	const { activeCategory } = useAppSelector((state) => state.categorySlice)

	const [search, setSearch] = useState<string>('')
	const searchProduct: IProduct[] = products.filter((products) =>
		products.title.toLowerCase().includes(search.toLowerCase())
	)

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

				<Filter className='my-5.5' search={search} setSearch={setSearch} />

				<div className='flex flex-row flex-wrap gap-3.5'>
					{searchProduct &&
						searchProduct.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
			</Container>
		</div>
	)
}

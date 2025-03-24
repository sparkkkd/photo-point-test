import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../components/Container/Container'
import { IProduct } from '../models/product.model'
import { ProductService } from '../api/Services/ProductService'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/slices/productsSlice'
import { toast } from 'sonner'

interface ProductPageProps {}

export const ProductPage: FC<ProductPageProps> = ({}) => {
	const { id } = useParams()
	const dispatch = useAppDispatch()

	const [product, setProduct] = useState<IProduct>({} as IProduct)

	const fetchProduct = async () => {
		const res = await ProductService.getOne(Number(id))
		setProduct(res.data)
	}

	useEffect(() => {
		fetchProduct()
	}, [])

	return (
		<section className='mt-25'>
			<Container>
				<div className='flex bg-white p-4 rounded-2xl shadow-lg gap-8'>
					<div className='h-[300px]'>
						<img
							className='h-full w-full object-contain'
							src={product.image}
							alt='product-preview'
						/>
					</div>
					<div className='flex flex-col w-full h-full gap-3'>
						<h4 className='text-4xl text-center'>{product.title}</h4>
						<p className='first-letter:uppercase'>{product.description}</p>
						<p className='text-2xl font-bold'>${product.price}</p>
						<button
							onClick={() => {
								dispatch(addToCart(product))
								toast.message('Success', {
									description: `${product.title} added to cart`,
								})
							}}
							className='p-3 mt-auto w-full text-stone-900 font-semibold border-stone-300 border-1 hover:bg-[#F2EDE7] hover:border-[#F2EDE7] rounded-2xl cursor-pointer transition-all duration-300'
						>
							Add to cart
						</button>
					</div>
				</div>
			</Container>
		</section>
	)
}

import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { addToCart } from '../../store/slices/productsSlice'
import { toast } from 'sonner'

import { IProduct } from '../../models/product.model'

interface ProductCardProps {
	product: IProduct
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const titleMaxLength = 20

	let shortTitle =
		product.title.length >= titleMaxLength - 3
			? product.title.slice(0, titleMaxLength - 3) + '...'
			: product.title

	const handleAddToCart = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		e.preventDefault()
		dispatch(addToCart(product))
		toast.message('Success', {
			description: `${product.title} added to cart`,
		})
	}

	return (
		<div
			onClick={() => navigate(`/product/${product.id}`)}
			className='flex flex-col items-center gap-2.5 relative bg-white p-4.5 shadow-sm rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 basis-[32.5%]'
		>
			<div className='absolute top-2 left-2 p-2.5 text-white rounded-2xl bg-black/30 font-semibold'>
				{product.category}
			</div>
			<div className='h-[200px] w-full'>
				<img
					className='h-full w-full object-contain'
					src={product.image}
					alt='product-preview'
				/>
			</div>
			<h4 className='mt-7 font-bold text-xl text-center'>{shortTitle}</h4>
			<p className='font-bold text-2xl mt-auto'>{product.price}$</p>
			<button
				onClick={handleAddToCart}
				className='p-3 mt-auto w-full text-stone-900 font-semibold border-stone-300 border-1 hover:bg-[#F2EDE7] hover:border-[#F2EDE7] rounded-2xl cursor-pointer transition-all duration-300'
			>
				Add to cart
			</button>
		</div>
	)
}

import { FC } from 'react'
import { IProduct } from '../../models/product.model'
import { Link, useNavigate } from 'react-router-dom'

interface ProductCardProps {
	product: IProduct
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate()

	const titleMaxLength = 20
	const descriptionMaxLength = 50

	let shortTitle =
		product.title.length >= titleMaxLength - 3
			? product.title.slice(0, titleMaxLength - 3) + '...'
			: product.title

	let shortDescription =
		product.description.length >= descriptionMaxLength - 3
			? product.description.slice(0, descriptionMaxLength - 3) + '...'
			: product.description

	const handleAddToCart = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		e.preventDefault()
		alert('Product added to cart!')
	}

	return (
		<div
			onClick={() => navigate(`/product/${product.id}`)}
			className='flex flex-col items-center gap-2.5 relative p-4.5 shadow-sm rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 basis-[32.5%]'
		>
			<div className='h-[200px] w-[100px]'>
				<img
					className='h-full w-full object-contain'
					src={product.image}
					alt='product-preview'
				/>
			</div>
			<h4 className='font-bold text-xl text-center'>{shortTitle}</h4>
			<p className='text-center'>{shortDescription}</p>
			<p className='font-bold'>{product.category}</p>
			<p className='font-bold text-2xl mt-auto'>{product.price}$</p>
			<button
				onClick={handleAddToCart}
				className='p-3 mt-auto text-indigo-700 font-semibold rounded-2xl cursor-pointer bg-blue-200 hover:bg-blue-400 transition-all duration-300'
			>
				Add to cart
			</button>
		</div>
	)
}

import { FC } from 'react'
import { ICartProduct } from '../../models/product.model'
import { useAppDispatch } from '../../store/hooks'
import {
	removeAllFromCart,
	removeOneFromCart,
} from '../../store/slices/productsSlice'
import { toast } from 'sonner'

interface CartProductProps {
	product: ICartProduct
}

export const CartProduct: FC<CartProductProps> = ({ product }) => {
	const dispatch = useAppDispatch()

	return (
		<li
			key={product.id}
			className='w-full p-2.5 flex gap-2.5 bg-white shadow-sm rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300'
		>
			<div className='h-[200px] w-[200px]'>
				<img
					src={product.image}
					alt='product-image'
					className='h-full w-full object-contain'
				/>
			</div>
			<div className='w-full flex flex-col gap-1.5'>
				<div className='text-2xl'>{product.title}</div>
				<div>{product.description}</div>
				<div className='font-semibold'>${product.price}</div>
				<div>Quantity: {product.count}</div>
				<div className='flex gap-1.5'>
					<button
						onClick={() => {
							dispatch(removeAllFromCart(product.id))
							toast.message('Success', {
								description: `${product.count} ${product.title} removed from cart`,
							})
						}}
						className='p-3 mt-auto w-full text-stone-900 font-semibold border-stone-300 border-1 hover:bg-[#F2EDE7] hover:border-[#F2EDE7] rounded-2xl cursor-pointer transition-all duration-300'
					>
						Remove all from cart
					</button>
					<button
						onClick={() => {
							dispatch(removeOneFromCart(product.id))
							toast.message('Success', {
								description: `1 ${product.title} removed from cart`,
							})
						}}
						className='p-3 mt-auto w-full text-stone-900 font-semibold border-stone-300 border-1 hover:bg-[#F2EDE7] hover:border-[#F2EDE7] rounded-2xl cursor-pointer transition-all duration-300'
					>
						Remove one from cart
					</button>
				</div>
			</div>
		</li>
	)
}

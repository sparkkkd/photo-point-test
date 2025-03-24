import { FC } from 'react'
import { Container } from '../components/Container/Container'
import { useAppSelector } from '../store/hooks'
import { CartProduct } from '../components/CartProduct/CartProduct'

interface CartPageProps {}

export const CartPage: FC<CartPageProps> = ({}) => {
	const { cart } = useAppSelector((state) => state.productSlice)

	return (
		<div className='mt-25'>
			<Container>
				<div className='flex flex-col'>
					<h4 className='text-6xl text-center mb-3.5'>Cart</h4>

					{!cart.length ? (
						<div className='text-2xl text-center'>Cart is empty</div>
					) : (
						<ul className='flex flex-col gap-6'>
							{cart.map((product) => (
								<CartProduct product={product} />
							))}
						</ul>
					)}
				</div>
			</Container>
		</div>
	)
}

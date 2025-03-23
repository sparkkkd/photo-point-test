import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	getAllCategories,
	toggleActiveCategory,
} from '../../store/slices/categorySlice'
import {
	getAllProducts,
	getProductsByCategory,
} from '../../store/slices/productsSlice'

import { IoIosArrowRoundDown } from 'react-icons/io'
import { IoCartOutline } from 'react-icons/io5'
import { FaShopify } from 'react-icons/fa6'

import { Container } from '../../components/Container/Container'
import { Link } from 'react-router-dom'

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
	const { isError, isLoading, categories } = useAppSelector(
		(state) => state.categorySlice
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllCategories())
	}, [])

	return (
		<header className='border-stone-300 border-b-1 text-black fixed w-full left-0 top-0 z-20 bg-[#fcfaf8]'>
			<Container>
				<div className='py-5 flex items-center justify-between'>
					<Link to='/'>
						<div className='text-xl flex items-center gap-3'>
							Ecom PhotoPaint
							<FaShopify />
						</div>
					</Link>
					<div className='flex items-center text-xl cursor-pointer relative group z-10'>
						Browse categories
						<IoIosArrowRoundDown size={25} />
						<ul className='absolute top-[100%] p-3 rounded-2xl left-0 w-full bg-white hidden group-hover:block'>
							<li
								className='hover:bg-amber-50 p-1 first-letter:uppercase'
								onClick={() => {
									dispatch(getAllProducts())
									dispatch(toggleActiveCategory('All'))
								}}
							>
								All
							</li>
							{!isLoading &&
								!isError &&
								categories.map((category, i) => (
									<li
										key={i}
										onClick={() => {
											dispatch(getProductsByCategory(category))
											dispatch(toggleActiveCategory(category))
										}}
										className='hover:bg-amber-50 p-1 first-letter:uppercase'
									>
										{category}
									</li>
								))}
						</ul>
					</div>

					<input
						type='text'
						placeholder='Search...'
						className='px-2.5 py-1.5 w-[600px] border-1 outline-stone-200 border-stone-200 rounded-2xl'
					/>

					<Link to='/cart'>
						<div className='flex items-center gap-1 text-xl cursor-pointer'>
							Cart
							<IoCartOutline />
						</div>
					</Link>
				</div>
			</Container>
		</header>
	)
}

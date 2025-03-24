import { FC, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AnimatePresence, motion } from 'framer-motion'

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
import { scaleWithBlur } from '../../utils/animationVariants'

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
	const [open, setOpen] = useState<boolean>(false)
	const categoryRef = useRef<HTMLDivElement>(null)

	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		categoryRef.current?.addEventListener('mouseenter', () => setOpen(true))
		categoryRef.current?.addEventListener('mouseleave', () => setOpen(false))

		return () => {
			categoryRef.current?.removeEventListener('mouseenter', () =>
				setOpen(true)
			)
			categoryRef.current?.removeEventListener('mouseleave', () =>
				setOpen(false)
			)
		}
	}, [])

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
					{/* Browse categories */}
					<div
						ref={categoryRef}
						className='flex items-center text-xl cursor-pointer relative group z-10 hover:bg-stone-200 p-2.5 rounded-lg duration-300'
					>
						Browse categories
						<IoIosArrowRoundDown size={25} />
						<AnimatePresence>
							{open && (
								<motion.ul
									variants={scaleWithBlur(0.2)}
									initial='initial'
									animate='animate'
									exit='initial'
									className='absolute top-[100%] p-3 rounded-2xl left-0 w-full bg-white'
								>
									<li
										className='hover:bg-stone-200 rounded-lg duration-300 p-1 first-letter:uppercase'
										onClick={() => {
											dispatch(getAllProducts())
											dispatch(toggleActiveCategory('All'))
											if (location.pathname !== '/') navigate('/')
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
													if (location.pathname !== '/') navigate('/')
												}}
												className='hover:bg-stone-200 p-1 first-letter:uppercase rounded-lg duration-300'
											>
												{category}
											</li>
										))}
								</motion.ul>
							)}
						</AnimatePresence>
					</div>

					{/* Link home page */}
					<Link to='/' className='absolute left-1/2 -translate-x-1/2'>
						<div className='text-xl flex items-center gap-3'>
							Ecom PhotoPaint
							<FaShopify />
						</div>
					</Link>

					{/* Cart */}
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

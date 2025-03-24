import clsx from 'clsx'
import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { useAppDispatch } from '../../store/hooks'
import { AnimatePresence, motion } from 'framer-motion'

import { filterProducts } from '../../store/slices/productsSlice'

interface FilterProps {
	className?: string
	search: string
	setSearch: Dispatch<SetStateAction<string>>
}

interface ISortList {
	name: string
	value: 'lower' | 'higher' | 'az' | 'za'
}

const SORT_LIST: ISortList[] = [
	{ name: 'Дешевле', value: 'lower' },
	{ name: 'Дороже', value: 'higher' },
	{ name: 'А-Я', value: 'az' },
	{ name: 'Я-А', value: 'za' },
]

export const Filter: FC<FilterProps> = ({ className, search, setSearch }) => {
	const [open, setOpen] = useState<boolean>(false)
	const dispath = useAppDispatch()
	const sortRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		sortRef.current?.addEventListener('mouseenter', () => setOpen(true))
		sortRef.current?.addEventListener('mouseleave', () => setOpen(false))

		return () => {
			sortRef.current?.removeEventListener('mouseenter', () => setOpen(true))
			sortRef.current?.removeEventListener('mouseleave', () => setOpen(false))
		}
	}, [])

	return (
		<div className={clsx('flex flex-row items-center', className)}>
			<div
				ref={sortRef}
				className='flex flex-row items-center gap-1 cursor-pointer relative hover:bg-stone-200 p-2 rounded-lg duration-300 group'
			>
				<HiOutlineArrowsUpDown />
				Сортировка
				<AnimatePresence>
					{open && (
						<motion.ul
							className='absolute left-0 top-[100%] w-full z-10 bg-white shadow-2xl rounded-lg p-2.5 flex-col gap-1.5 flex'
							initial={{
								opacity: 0,
								scale: 0,
								filter: 'blur(10px)',
								transition: { duration: 0.2 },
							}}
							animate={{
								opacity: 1,
								scale: 1,
								filter: 'blur(0px)',
								transition: { duration: 0.2 },
							}}
							exit={{
								opacity: 0,
								scale: 0,
								filter: 'blur(5px)',
								transition: { duration: 0.2 },
							}}
						>
							{SORT_LIST.map(({ name, value }) => (
								<li
									onClick={() => dispath(filterProducts(value))}
									className='p-2 rounded-md hover:bg-stone-300 duration-300'
									key={value}
								>
									{name}
								</li>
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>

			<input
				type='text'
				placeholder='Search...'
				className='px-2.5 py-1.5 w-[900px] ml-auto border-1 outline-stone-200 border-stone-200 rounded-2xl'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	)
}

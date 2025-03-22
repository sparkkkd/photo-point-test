import { FC } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
	return (
		<header className='flex justify-center items-center py-5 border-b-blue-300 border-b-1 mb-5 text-blue-500'>
			<Link to='/'>
				<h1 className='text-2xl font-bold'>PhotoPoint Test</h1>
			</Link>
		</header>
	)
}

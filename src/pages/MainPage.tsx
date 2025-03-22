import { FC } from 'react'
import { Container } from '../components/Container/Container'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
	return (
		<div>
			<Container>
				<h1>Main page</h1>
			</Container>
		</div>
	)
}

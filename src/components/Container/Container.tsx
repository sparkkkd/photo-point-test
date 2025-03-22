import { FC } from 'react'

interface ContainerProps extends React.PropsWithChildren {}

export const Container: FC<ContainerProps> = ({ children }) => {
	return <div className='max-w-[1200px] mx-auto px-2.5'>{children}</div>
}

import { Variants } from 'framer-motion'

export const scaleWithBlur = (duration: number): Variants => {
	return {
		initial: {
			scale: 0,
			opacity: 0,
			filter: 'blur(5px)',
			transition: { duration: duration },
		},
		animate: {
			scale: 1,
			opacity: 1,
			filter: 'blur(0px)',
			transition: { duration: duration },
		},
	}
}

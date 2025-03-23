export interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
}

export interface ICartProduct extends IProduct {
	count: number
}

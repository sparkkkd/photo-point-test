import { IProduct } from '../../models/product.model'
import { $http } from '../http'

export class ProductService {
	static async getAll() {
		return await $http.get<IProduct[]>(`/products`)
	}

	static async getByCategory(category: string) {
		return await $http.get<IProduct[]>(`/products/category/${category}`)
	}

	static async getOne(id: number) {
		return await $http.get<IProduct>(`/products/${id}`)
	}
}

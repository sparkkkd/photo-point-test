import { $http } from '../http'

export class CategoryService {
	static getAll() {
		return $http.get<string[]>('products/categories')
	}
}

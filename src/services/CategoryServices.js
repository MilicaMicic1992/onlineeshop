import axios from "axios"

class CategoryService {
    static getAllCategory = () => axios.get('/products/categories')
}

export default CategoryService

'https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1&select=key2&select=key3'
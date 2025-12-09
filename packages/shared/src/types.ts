// Product types
export type ProductType = 'Books' | 'Music' | 'Games'

export interface Product {
  id: number
  name: string
  type: ProductType
  description: string | null
}

// User types
export interface User {
  userId: number
  loginName: string
  password: string
}

// Basket types
export interface Basket {
  id: number
  productId: number
  userId: number
  quantity: number
}

// Basket with product details (for joins)
export interface BasketItem extends Basket {
  product: Product
}

export type TargetMarket =
  | 'Men'
  | 'Women'
  | 'Boys'
  | 'Girls'
  | 'Unisex'
  | 'Adults'
  | 'All'

export type ProductStatus =
  'draft' | 'review' | 'published' | 'archived'

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'

export interface Brand {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
}

export interface Product {
  id: string
  name: string
  productCode: string
  brandId: number
  categoryId: number
  status: ProductStatus
  description: string
  targetMarket: TargetMarket[]  
  season: Season
  createdAt: string
  updatedAt: string
}

export interface ProductWithRelations extends Product {
  brand: Brand
  category: Category
}

export interface CreateProductDto {
  name: string
  productCode: string
  brandId: number
  categoryId: number
  status: ProductStatus
  description: string
  targetMarket: TargetMarket[]
  season: Season
}

export interface UpdateProductDto {
  name?: string
  productCode?: string
  brandId?: number
  categoryId?: number
  status?: ProductStatus
  description?: string
  targetMarket?: TargetMarket[]
  season?: Season
}
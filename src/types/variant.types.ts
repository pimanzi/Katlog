export interface Variant {
  id: string
  productId: string
  name: string
  variantCode: string
  colour: string
  size: string
  material: string
  barcode?: string
  createdAt: string
  updatedAt: string
}



export interface CreateVariantDto {
  productId: string
  name: string
  variantCode: string
  colour: string
  size: string
  material: string
  barcode?: string
}

export interface UpdateVariantDto {
  name?: string
  variantCode?: string
  colour?: string
  size?: string
  material?: string
  barcode?: string
}


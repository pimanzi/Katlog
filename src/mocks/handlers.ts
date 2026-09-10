import { http, HttpResponse } from 'msw'
import { mockProducts } from '@/data/mockProducts'
import { mockAssets } from '@/data/mockAssets'
import { mockVariants } from '@/data/mockVariants'
import { mockBrands } from '@/data/mockBrands'
import { mockCategories } from '@/data/mockCategories'
import { generateId } from '@/utils/generateId'
import type { Product, ProductWithRelations, CreateProductDto, UpdateProductDto } from '@/types/product.types'
import type { Asset, CreateAssetDto } from '@/types/asset.types'
import type { Variant, CreateVariantDto, UpdateVariantDto } from '@/types/variant.types'

const withRelations = (product: Product): ProductWithRelations => ({
  ...product,
  brand:    mockBrands.find(b => b.id === product.brandId)!,
  category: mockCategories.find(c => c.id === product.categoryId)!,
})

export const handlers = [

  // Products

  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts.map(withRelations))
  }),

  http.get('/api/products/:id', ({ params }) => {
    const product = mockProducts.find(p => p.id === params.id)
    if (!product) return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
    return HttpResponse.json(withRelations(product))
  }),

  http.post('/api/products', async ({ request }) => {
    const body = await request.json() as CreateProductDto
    const newProduct: Product = {
      ...body,
      id:        generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockProducts.push(newProduct)
    return HttpResponse.json(withRelations(newProduct), { status: 201 })
  }),

  http.patch('/api/products/:id', async ({ params, request }) => {
    const index = mockProducts.findIndex(p => p.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
    const body = await request.json() as UpdateProductDto
    mockProducts[index] = { ...mockProducts[index], ...body, updatedAt: new Date().toISOString() }
    return HttpResponse.json(withRelations(mockProducts[index]))
  }),

  http.delete('/api/products/:id', ({ params }) => {
    const index = mockProducts.findIndex(p => p.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
    mockProducts.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  //Assets

  http.get('/api/assets', () => {
    const sorted = [...mockAssets].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )
    return HttpResponse.json(sorted)
  }),

  http.get('/api/assets/pending', () => {
    const pending = mockAssets
      .filter(a => a.status === 'pending_review')
      .sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
    return HttpResponse.json(pending)
  }),

  http.get('/api/assets/:id', ({ params }) => {
    const asset = mockAssets.find(a => a.id === params.id)
    if (!asset) return HttpResponse.json({ message: 'Asset not found' }, { status: 404 })
    return HttpResponse.json(asset)
  }),

  http.get('/api/products/:productId/assets', ({ params }) => {
    const assets = mockAssets
      .filter(a => a.productId === params.productId && !a.variantId)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    return HttpResponse.json(assets)
  }),

  http.get('/api/variants/:variantId/assets', ({ params }) => {
    const assets = mockAssets
      .filter(a => a.variantId === params.variantId)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    return HttpResponse.json(assets)
  }),

  http.post('/api/assets', async ({ request }) => {
    const formData  = await request.formData()
    const file      = formData.get('file') as File | null
    const data      = JSON.parse(formData.get('data') as string) as CreateAssetDto
    const newAsset: Asset = {
      id:              generateId(),
      productId:       data.productId,
      variantId:       data.variantId,
      assetType:       data.assetType,
      title:           data.title,
      description:     data.description,
      tags:            data.tags ?? [],
      status:          'pending_review',
      url:             `https://res.cloudinary.com/mock/image/upload/${file?.name ?? 'asset'}`,
      uploadedAt:      new Date().toISOString(),
      rejectionReason: undefined,
      statusHistory:   [{ status: 'pending_review', changedAt: new Date().toISOString() }],
    }
    mockAssets.push(newAsset)
    return HttpResponse.json(newAsset, { status: 201 })
  }),

  http.patch('/api/assets/:id/approve', ({ params }) => {
    const index = mockAssets.findIndex(a => a.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Asset not found' }, { status: 404 })
    mockAssets[index].status = 'approved'
    mockAssets[index].rejectionReason = undefined
    mockAssets[index].statusHistory.push({ status: 'approved', changedAt: new Date().toISOString() })
    return HttpResponse.json(mockAssets[index])
  }),

  http.patch('/api/assets/:id/reject', async ({ params, request }) => {
    const index = mockAssets.findIndex(a => a.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Asset not found' }, { status: 404 })
    const { reason } = await request.json() as { reason: string }
    mockAssets[index].status          = 'rejected'
    mockAssets[index].rejectionReason = reason
    mockAssets[index].statusHistory.push({ status: 'rejected', changedAt: new Date().toISOString(), reason })
    return HttpResponse.json(mockAssets[index])
  }),

  http.delete('/api/assets/:id', ({ params }) => {
    const index = mockAssets.findIndex(a => a.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Asset not found' }, { status: 404 })
    mockAssets.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  //Variants 

  http.get('/api/variants', () => {
    return HttpResponse.json([...mockVariants])
  }),

  http.get('/api/products/:productId/variants', ({ params }) => {
    const variants = mockVariants.filter(v => v.productId === params.productId)
    return HttpResponse.json(variants)
  }),

  http.post('/api/variants', async ({ request }) => {
    const body = await request.json() as CreateVariantDto
    const newVariant: Variant = {
      ...body,
      id:        generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockVariants.push(newVariant)
    return HttpResponse.json(newVariant, { status: 201 })
  }),

  http.patch('/api/variants/:id', async ({ params, request }) => {
    const index = mockVariants.findIndex(v => v.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Variant not found' }, { status: 404 })
    const body = await request.json() as UpdateVariantDto
    mockVariants[index] = { ...mockVariants[index], ...body, updatedAt: new Date().toISOString() }
    return HttpResponse.json(mockVariants[index])
  }),

  http.delete('/api/variants/:id', ({ params }) => {
    const index = mockVariants.findIndex(v => v.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Variant not found' }, { status: 404 })
    mockVariants.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]

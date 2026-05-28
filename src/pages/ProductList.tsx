import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination'
import { ProductFilters } from '@/features/product/ProductFilters'
import { ProductTable, type Product } from '@/features/product/ProductTable'
import { DeleteProductDialog } from '@/features/product/DeleteProductDialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useProducts, useDeleteProduct } from '@/hooks/products'
import { mockVariants } from '@/data/mockVariants'
import { mockAssets } from '@/data/mockAssets'
import { calculateReadiness } from '@/utils/calculateReadiness'
import type { ProductWithRelations } from '@/types/product.types'

const ITEMS_PER_PAGE = 10

function toTableProduct(p: ProductWithRelations): Product {
  const variants = mockVariants.filter(v => v.productId === p.id)
  const assets   = mockAssets.filter(a => a.productId === p.id)
  const { percentage } = calculateReadiness(p, variants, assets)
  return {
    id: p.id,
    name: p.name,
    code: p.productCode,
    brand: p.brand.name,
    category: p.category.name,
    status: p.status,
    readiness: percentage,
  }
}

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const { data: rawProducts = [], isLoading } = useProducts()
  const deleteProduct = useDeleteProduct()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const searchTerm = searchParams.get('search') || ''
  const selectedBrand = searchParams.get('brand') || 'all'
  const selectedCategory = searchParams.get('category') || 'all'
  const selectedStatus = searchParams.get('status') || 'all'
  const selectedReadiness = searchParams.get('readiness') || 'all'

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedBrand !== 'all' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedReadiness !== 'all'

  const clearFilters = () => setSearchParams({})

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    newParams.delete('page')
    setSearchParams(newParams)
  }

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
  }

  const products = useMemo(
    () => [...rawProducts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(toTableProduct),
    [rawProducts]
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus

      let matchesReadiness = true
      if (selectedReadiness !== 'all') {
        if (selectedReadiness === 'not-ready') matchesReadiness = product.readiness <= 40
        else if (selectedReadiness === 'in-progress') matchesReadiness = product.readiness >= 41 && product.readiness <= 74
        else if (selectedReadiness === 'almost-ready') matchesReadiness = product.readiness >= 75 && product.readiness <= 99
        else if (selectedReadiness === 'ready') matchesReadiness = product.readiness === 100
      }

      return matchesSearch && matchesBrand && matchesCategory && matchesStatus && matchesReadiness
    })
  }, [products, searchTerm, selectedBrand, selectedCategory, selectedStatus, selectedReadiness])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const renderPaginationItems = () => {
    const items = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => goToPage(i)} isActive={currentPage === i} className="cursor-pointer">
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => goToPage(1)} isActive={currentPage === 1} className="cursor-pointer">1</PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) items.push(<PaginationEllipsis key="ellipsis-start" />)

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => goToPage(i)} isActive={currentPage === i} className="cursor-pointer">
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 2) items.push(<PaginationEllipsis key="ellipsis-end" />)

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => goToPage(totalPages)} isActive={currentPage === totalPages} className="cursor-pointer">
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  const handleView = (product: Product) => navigate(`/products/${product.id}`)
  const handleEdit = (product: Product) => navigate(`/products/${product.id}/edit`)
  const handleDelete = (product: Product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct.mutate(productToDelete.id)
      setProductToDelete(null)
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Product catalog</h1>
          <p className="text-sm text-text-muted mt-1">Manage and organize your product inventory</p>
        </div>
        <Button className="hidden sm:flex" onClick={() => navigate('/products/create')}>
          <Plus size={16} />
          Add product
        </Button>
      </div>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={(value) => updateSearchParam('search', value)}
            selectedBrand={selectedBrand}
            onBrandChange={(value) => updateSearchParam('brand', value)}
            selectedCategory={selectedCategory}
            onCategoryChange={(value) => updateSearchParam('category', value)}
            selectedStatus={selectedStatus}
            onStatusChange={(value) => updateSearchParam('status', value)}
            selectedReadiness={selectedReadiness}
            onReadinessChange={(value) => updateSearchParam('readiness', value)}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-24 hidden sm:block" />
                  <Skeleton className="h-4 w-20 hidden md:block" />
                  <Skeleton className="h-4 w-20 hidden lg:block" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-3 w-24 hidden xl:block" />
                  <Skeleton className="h-7 w-7 ml-auto rounded-md" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center py-16 text-sm text-text-muted">
              No products found
            </div>
          ) : (
            <ProductTable
              products={paginatedProducts}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productName={productToDelete?.name || ''}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

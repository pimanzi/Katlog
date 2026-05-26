import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination'
import { ProductFilters } from '@/features/product/ProductFilters'
import { ProductTable, type Product } from '@/features/product/ProductTable'
import { DeleteProductDialog } from '@/features/product/DeleteProductDialog'

const ITEMS_PER_PAGE = 10

// Mock data - replace with API call
const mockProducts: Product[] = [
  { id: '1', name: 'Air Max 90', code: 'AM90-001', brand: 'Nike', category: 'Footwear', status: 'published', readiness: 100 },
  { id: '2', name: 'Ultraboost 22', code: 'UB22-002', brand: 'Adidas', category: 'Footwear', status: 'ready', readiness: 95 },
  { id: '3', name: 'Tech Fleece Hoodie', code: 'TFH-003', brand: 'Nike', category: 'Apparel', status: 'review', readiness: 68 },
  { id: '4', name: 'Classic Backpack', code: 'CBP-004', brand: 'Puma', category: 'Accessories', status: 'draft', readiness: 35 },
  { id: '5', name: 'Running Shorts', code: 'RS-005', brand: 'Adidas', category: 'Apparel', status: 'published', readiness: 100 },
  { id: '6', name: 'Training Gloves', code: 'TG-006', brand: 'Nike', category: 'Accessories', status: 'archived', readiness: 100 },
  { id: '7', name: 'RS-X Sneakers', code: 'RSX-007', brand: 'Puma', category: 'Footwear', status: 'review', readiness: 82 },
  { id: '8', name: 'Performance Tee', code: 'PT-008', brand: 'Adidas', category: 'Apparel', status: 'draft', readiness: 22 },
  { id: '9', name: 'Jordan 1 High', code: 'J1H-009', brand: 'Nike', category: 'Footwear', status: 'published', readiness: 100 },
  { id: '10', name: 'Stan Smith', code: 'SS-010', brand: 'Adidas', category: 'Footwear', status: 'ready', readiness: 88 },
  { id: '11', name: 'Windbreaker Jacket', code: 'WJ-011', brand: 'Puma', category: 'Apparel', status: 'review', readiness: 55 },
  { id: '12', name: 'Sports Watch', code: 'SW-012', brand: 'Nike', category: 'Accessories', status: 'draft', readiness: 18 },
  { id: '13', name: 'Yoga Pants', code: 'YP-013', brand: 'Adidas', category: 'Apparel', status: 'published', readiness: 100 },
  { id: '14', name: 'Gym Bag', code: 'GB-014', brand: 'Puma', category: 'Accessories', status: 'ready', readiness: 92 },
  { id: '15', name: 'Running Cap', code: 'RC-015', brand: 'Nike', category: 'Accessories', status: 'published', readiness: 100 },
  { id: '16', name: 'Track Pants', code: 'TP-016', brand: 'Adidas', category: 'Apparel', status: 'review', readiness: 72 },
  { id: '17', name: 'Suede Classic', code: 'SC-017', brand: 'Puma', category: 'Footwear', status: 'draft', readiness: 40 },
  { id: '18', name: 'Dri-FIT Shirt', code: 'DFS-018', brand: 'Nike', category: 'Apparel', status: 'published', readiness: 100 },
  { id: '19', name: 'NMD R1', code: 'NMD-019', brand: 'Adidas', category: 'Footwear', status: 'ready', readiness: 85 },
  { id: '20', name: 'Training Shorts', code: 'TS-020', brand: 'Puma', category: 'Apparel', status: 'archived', readiness: 100 },
  { id: '21', name: 'Compression Socks', code: 'CS-021', brand: 'Nike', category: 'Accessories', status: 'review', readiness: 65 },
  { id: '22', name: 'Hoodie Essential', code: 'HE-022', brand: 'Adidas', category: 'Apparel', status: 'draft', readiness: 28 },
  { id: '23', name: 'Future Rider', code: 'FR-023', brand: 'Puma', category: 'Footwear', status: 'published', readiness: 100 },
  { id: '24', name: 'Water Bottle', code: 'WB-024', brand: 'Nike', category: 'Accessories', status: 'ready', readiness: 95 },
  { id: '25', name: 'Sweatpants', code: 'SP-025', brand: 'Adidas', category: 'Apparel', status: 'published', readiness: 100 },
]

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  
  const searchTerm = searchParams.get('search') || ''
  const selectedBrand = searchParams.get('brand') || 'all'
  const selectedCategory = searchParams.get('category') || 'all'
  const selectedStatus = searchParams.get('status') || 'all'
  const selectedReadiness = searchParams.get('readiness') || 'all'

  const hasActiveFilters = searchTerm !== '' || selectedBrand !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedReadiness !== 'all'

  const clearFilters = () => {
    setSearchParams({})
  }

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    newParams.delete('page') // Reset to page 1 when filters change
    setSearchParams(newParams)
  }

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
  }

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
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
  }, [searchTerm, selectedBrand, selectedCategory, selectedStatus, selectedReadiness])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const renderPaginationItems = () => {
    const items = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => goToPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />)
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />)
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => goToPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  const handleView = (product: Product) => {
    navigate(`/products/${product.id}`)
  }

  const handleEdit = (product: Product) => {
    navigate(`/products/${product.id}/edit`)
  }

  const handleDelete = (product: Product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      console.log('Deleting product:', productToDelete)
      // TODO: Add API call to delete product
      setProductToDelete(null)
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Product catalog</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage and organize your product inventory
          </p>
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
          <ProductTable 
            products={paginatedProducts}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {totalPages > 1 && (
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

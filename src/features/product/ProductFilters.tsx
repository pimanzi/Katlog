import { Search, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

interface ProductFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedBrand: string
  onBrandChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedStatus: string
  onStatusChange: (value: string) => void
  selectedReadiness: string
  onReadinessChange: (value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedReadiness,
  onReadinessChange,
  onClearFilters,
  hasActiveFilters,
}: ProductFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
        <input
          type="text"
          placeholder="Search by name or code..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
        />
      </div>

  
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <Select value={selectedBrand} onValueChange={onBrandChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All brands</SelectItem>
            <SelectItem value="nike">Nike</SelectItem>
            <SelectItem value="adidas">Adidas</SelectItem>
            <SelectItem value="puma">Puma</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="footwear">Footwear</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedReadiness} onValueChange={onReadinessChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All readiness" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All readiness</SelectItem>
            <SelectItem value="not-ready">Not ready (0-40%)</SelectItem>
            <SelectItem value="in-progress">In progress (41-74%)</SelectItem>
            <SelectItem value="almost-ready">Almost ready (75-99%)</SelectItem>
            <SelectItem value="ready">Ready (100%)</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-muted hover:text-text col-span-2 sm:col-span-1"
          >
            <X size={16} />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}

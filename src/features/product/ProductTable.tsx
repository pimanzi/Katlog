import { Eye, Pencil, Trash2, MoreVertical } from 'lucide-react'
import { ProductStatusBadge } from './ProductStatusBadge'
import { ReadinessBar } from './ReadinessBar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export interface Product {
  id: string
  name: string
  code: string
  brand: string
  category: string
  status: 'draft' | 'review' | 'published' | 'archived' | 'ready'
  readiness: number
}

interface ProductTableProps {
  products: Product[]
  onView?: (product: Product) => void
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
}

export function ProductTable({ products, onView, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted text-sm">
        No products found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide">Product</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell">Code</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">Brand</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">Category</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide">Status</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide hidden xl:table-cell">Readiness</th>
            <th className="text-center py-3 px-4 text-[11px] font-semibold text-text-muted uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-border hover:bg-bg transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text">{product.name}</span>
                  <span className="text-xs text-text-muted font-mono sm:hidden">{product.code}</span>
                </div>
              </td>
              <td className="py-3 px-4 hidden sm:table-cell">
                <span className="text-sm text-text-muted font-mono">{product.code}</span>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                <span className="text-sm text-text">{product.brand}</span>
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
                <span className="text-sm text-text-muted">{product.category}</span>
              </td>
              <td className="py-3 px-4">
                <ProductStatusBadge status={product.status} />
              </td>
              <td className="py-3 px-4 hidden xl:table-cell">
                <ReadinessBar percentage={product.readiness} />
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical size={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-1">
                      <button
                        onClick={() => onView?.(product)}
                        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-text rounded-md hover:bg-primary hover:text-white transition-colors"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => onEdit?.(product)}
                        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-text rounded-md hover:bg-primary hover:text-white transition-colors"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete?.(product)}
                        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-error rounded-md hover:bg-error hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

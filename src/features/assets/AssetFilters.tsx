import { Search, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

type SearchScope = 'name' | 'product' | 'variant' | 'tag'

const SCOPE_LABELS: Record<SearchScope, string> = {
  name:    'File name',
  product: 'Product',
  variant: 'Variant',
  tag:     'Tag',
}

interface AssetFiltersProps {
  query:          string
  scope:          SearchScope
  type:           string
  status:         string
  date:           string
  hasActive:      boolean
  onQueryChange:  (v: string) => void
  onScopeChange:  (v: SearchScope) => void
  onTypeChange:   (v: string) => void
  onStatusChange: (v: string) => void
  onDateChange:   (v: string) => void
  onClear:        () => void
}

export function AssetFilters({
  query, scope, type, status, date, hasActive,
  onQueryChange, onScopeChange, onTypeChange, onStatusChange, onDateChange, onClear,
}: AssetFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex rounded-lg border border-border bg-card overflow-hidden focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20 transition-shadow">
        <Select value={scope} onValueChange={v => onScopeChange(v as SearchScope)}>
          <SelectTrigger
            size="sm"
            className="w-32 shrink-0 rounded-none border-0 border-r border-border bg-muted/40 text-xs font-medium focus:ring-0"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SCOPE_LABELS) as SearchScope[]).map(s => (
              <SelectItem key={s} value={s}>{SCOPE_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3 text-text-muted pointer-events-none" size={15} />
          <input
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder={`Search by ${SCOPE_LABELS[scope].toLowerCase()}...`}
            className="w-full h-9 pl-9 pr-3 bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="document">Document</SelectItem>
            <SelectItem value="3d">3D</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending_review">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={date} onValueChange={onDateChange}>
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="All time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
          </SelectContent>
        </Select>

        {hasActive && (
          <Button
            variant="ghost" size="sm"
            onClick={onClear}
            className="text-text-muted hover:text-text col-span-2 sm:col-span-1"
          >
            <X size={15} /> Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}

import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AppPagination from '@/components/ui/AppPagination'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetFilters } from '@/features/assets/AssetFilters'
import { AssetCardWithActions } from '@/features/assets/AssetCardWithActions'
import { useAssets } from '@/hooks/assets'
import { useProducts } from '@/hooks/products'
import { mockVariants } from '@/data/mockVariants'

const PER_PAGE = 12

function isThisWeek(date: Date) {
  const now   = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  start.setHours(0, 0, 0, 0)
  return date >= start
}

function isToday(date: Date) {
  const now = new Date()
  return date.toDateString() === now.toDateString()
}

function isThisMonth(date: Date) {
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
}

export default function AssetLibrary() {
  const [params, setParams] = useSearchParams()

  const query  = params.get('q')      ?? ''
  const scope  = (params.get('scope') ?? 'name') as 'name' | 'product' | 'variant' | 'tag'
  const type   = params.get('type')   ?? 'all'
  const status = params.get('status') ?? 'all'
  const date   = params.get('date')   ?? 'all'
  const page   = Number(params.get('page') ?? '1')

  const set = (key: string, value: string, resetPage = true) => {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      if (value === 'all' || value === '') next.delete(key)
      else next.set(key, value)
      if (resetPage) next.delete('page')
      return next
    })
  }

  const hasActive = !!(query || type !== 'all' || status !== 'all' || date !== 'all')

  const clearAll = () => {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      next.delete('q')
      next.delete('scope')
      next.delete('type')
      next.delete('status')
      next.delete('date')
      next.delete('page')
      return next
    })
  }

  const { data: assets = [], isLoading: isLoadingAssets } = useAssets()
  const { data: products = [] }                           = useProducts()

  const productMap = useMemo(
    () => new Map(products.map(p => [p.id, p.name])),
    [products]
  )

  const variantMap = useMemo(
    () => new Map(mockVariants.map(v => [v.id, v.name])),
    []
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    return assets.filter(asset => {
      if (q) {
        if (scope === 'name' && !asset.title.toLowerCase().includes(q)) return false
        if (scope === 'product') {
          const pName = productMap.get(asset.productId) ?? ''
          if (!pName.toLowerCase().includes(q)) return false
        }
        if (scope === 'variant') {
          const vName = asset.variantId ? (variantMap.get(asset.variantId) ?? '') : ''
          if (!vName.toLowerCase().includes(q)) return false
        }
        if (scope === 'tag') {
          const match = (asset.tags ?? []).some(t => t.toLowerCase().includes(q))
          if (!match) return false
        }
      }

      if (type !== 'all' && asset.assetType !== type) return false
      if (status !== 'all' && asset.status !== status) return false

      if (date !== 'all') {
        const uploaded = new Date(asset.uploadedAt)
        if (date === 'today' && !isToday(uploaded))       return false
        if (date === 'week'  && !isThisWeek(uploaded))    return false
        if (date === 'month' && !isThisMonth(uploaded))   return false
      }

      return true
    })
  }, [assets, query, scope, type, status, date, productMap, variantMap])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-text">Asset Library</h1>
        {!isLoadingAssets && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-text-muted">
            {filtered.length}
          </span>
        )}
      </div>

      <Card className="rounded-xl">
        <CardContent className="pt-4">
          <AssetFilters
            query={query}
            scope={scope}
            type={type}
            status={status}
            date={date}
            hasActive={hasActive}
            onQueryChange={v => set('q', v)}
            onScopeChange={v => set('scope', v === 'name' ? '' : v, false)}
            onTypeChange={v => set('type', v)}
            onStatusChange={v => set('status', v)}
            onDateChange={v => set('date', v)}
            onClear={clearAll}
          />
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {hasActive ? `Results (${filtered.length})` : 'All Assets'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingAssets ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-video rounded-xl" />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
              <p className="text-sm text-text-muted">
                {hasActive ? 'No assets match your filters.' : 'No assets yet.'}
              </p>
              {hasActive && (
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {paginated.map(asset => (
                <AssetCardWithActions key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={p => set('page', String(p), false)}
        />
      </div>
    </div>
  )
}

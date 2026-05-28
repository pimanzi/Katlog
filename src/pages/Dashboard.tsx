import { useMemo } from 'react'
import KpiCards from '@/components/dashboard/KpiCards'
import AssetTrendChart from '@/components/dashboard/AssetTrendChart'
import ProductsAddedChart from '@/components/dashboard/ProductsAddedChart'
import ReadinessCard from '@/components/dashboard/ReadinessCard'
import ProductStatusChart from '@/components/dashboard/ProductStatusChart'
import TopProducts from '@/components/dashboard/TopProducts'
import RecentAssets from '@/components/dashboard/RecentAssets'
import ReviewQueue from '@/components/dashboard/ReviewQueue'
import { useProducts } from '@/hooks/products'
import { useAssets } from '@/hooks/assets'
import { useAllVariants } from '@/hooks/variants'
import { getLast7Months, formatWaiting, isUrgent } from '@/utils/dateUtils'
import type { ReviewQueueItem } from '@/components/dashboard/ReviewQueue'

export default function Dashboard() {
  const { data: products = [], isLoading: lP } = useProducts()
  const { data: assets   = [], isLoading: lA } = useAssets()
  const { data: variants = [], isLoading: lV } = useAllVariants()

  const isLoading = lP || lA || lV

  const productMap = useMemo(
    () => new Map(products.map(p => [p.id, p.name])),
    [products]
  )

  const kpi = useMemo(() => ({
    total:     products.length,
    published: products.filter(p => p.status === 'published').length,
    pending:   assets.filter(a => a.status === 'pending_review').length,
    rejected:  assets.filter(a => a.status === 'rejected').length,
  }), [products, assets])

  const statusData = useMemo(() => {
    const c: Record<string, number> = {}
    products.forEach(p => { c[p.status] = (c[p.status] ?? 0) + 1 })
    return [
      { status: 'published', value: c.published ?? 0, fill: '#22c55e' },
      { status: 'review',    value: c.review    ?? 0, fill: '#f59e0b' },
      { status: 'draft',     value: c.draft     ?? 0, fill: '#cbd5e1' },
      { status: 'archived',  value: c.archived  ?? 0, fill: '#94a3b8' },
    ].filter(d => d.value > 0)
  }, [products])

  const topProducts = useMemo(() => {
    const countMap = new Map<string, number>()
    variants.forEach(v => countMap.set(v.productId, (countMap.get(v.productId) ?? 0) + 1))
    const max = Math.max(...products.map(p => countMap.get(p.id) ?? 0), 1)
    return [...products]
      .sort((a, b) => (countMap.get(b.id) ?? 0) - (countMap.get(a.id) ?? 0))
      .slice(0, 5)
      .map(p => ({
        name:     p.name,
        variants: countMap.get(p.id) ?? 0,
        pct:      Math.round(((countMap.get(p.id) ?? 0) / max) * 100),
      }))
  }, [products, variants])

  const recentAssets = useMemo(() =>
    [...assets]
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, 4),
    [assets]
  )

  const pendingAssets = useMemo(
    () => assets.filter(a => a.status === 'pending_review'),
    [assets]
  )

  const reviewQueue = useMemo<ReviewQueueItem[]>(() =>
    pendingAssets.slice(0, 4).map(a => ({
      id:        a.id,
      file:      a.title,
      product:   productMap.get(a.productId) ?? 'Unknown product',
      waiting:   formatWaiting(a.uploadedAt),
      urgent:    isUrgent(a.uploadedAt),
      url:       a.url,
      assetType: a.assetType,
    })),
    [pendingAssets, productMap]
  )

  const productsMonthly = useMemo(() => {
    const slots = getLast7Months()
    products.forEach(p => {
      const key  = p.createdAt.slice(0, 7)
      const slot = slots.find(s => s.key === key)
      if (slot) slot.count++
    })
    return slots.map(({ label, count }) => ({ month: label, count }))
  }, [products])

  const readinessData = useMemo(() => {
    if (products.length === 0) return { ready: 0, notReady: 0, total: 0, checklist: [] }

    const variantsByProduct = new Map<string, number>()
    variants.forEach(v => variantsByProduct.set(v.productId, (variantsByProduct.get(v.productId) ?? 0) + 1))

    const assetsByProduct = new Map<string, typeof assets>()
    assets.forEach(a => {
      const list = assetsByProduct.get(a.productId) ?? []
      list.push(a)
      assetsByProduct.set(a.productId, list)
    })

    const all = (fn: (p: typeof products[0]) => boolean) => products.every(fn)

    const checklist = [
      { label: 'Has product name',         done: all(p => !!p.name) },
      { label: 'Has product code',         done: all(p => !!p.productCode) },
      { label: 'Has description',          done: all(p => !!p.description) },
      { label: 'Has brand',                done: all(p => !!p.brandId) },
      { label: 'Has category',             done: all(p => !!p.categoryId) },
      { label: 'Has target market',        done: all(p => p.targetMarket.length > 0) },
      { label: 'Has season',               done: all(p => !!p.season) },
      { label: 'Has at least 1 variant',   done: all(p => (variantsByProduct.get(p.id) ?? 0) > 0) },
      { label: 'Has at least 1 asset',     done: all(p => (assetsByProduct.get(p.id)?.length ?? 0) > 0) },
      { label: 'Has 1 approved asset',     done: all(p => (assetsByProduct.get(p.id) ?? []).some(a => a.status === 'approved')) },
      { label: 'All assets approved',      done: all(p => { const pa = assetsByProduct.get(p.id) ?? []; return pa.length > 0 && pa.every(a => a.status === 'approved') }) },
    ]

    const ready = products.filter(p =>
      (variantsByProduct.get(p.id) ?? 0) > 0 &&
      (assetsByProduct.get(p.id) ?? []).some(a => a.status === 'approved')
    ).length

    return { ready, notReady: products.length - ready, total: products.length, checklist }
  }, [products, variants, assets])

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <KpiCards kpi={kpi} isLoading={isLoading} />
          <AssetTrendChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductsAddedChart data={productsMonthly} isLoading={isLoading} />
            <ReadinessCard data={readinessData} isLoading={isLoading} />
          </div>
        </div>

        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <TopProducts products={topProducts} isLoading={isLoading} />
          <div className="flex-1 flex flex-col min-h-0">
            <ProductStatusChart data={statusData} isLoading={isLoading} className="h-full" />
          </div>
        </div>
      </div>
      
      <ReviewQueue items={reviewQueue} totalPending={pendingAssets.length} isLoading={isLoading} />
      <RecentAssets assets={recentAssets} isLoading={isLoading} />

    </div>
  )
}

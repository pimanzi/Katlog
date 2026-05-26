import KpiCards from '@/components/dashboard/KpiCards'
import AssetTrendChart from '@/components/dashboard/AssetTrendChart'
import ProductsAddedChart from '@/components/dashboard/ProductsAddedChart'
import ReadinessCard from '@/components/dashboard/ReadinessCard'
import ProductStatusChart from '@/components/dashboard/ProductStatusChart'
import TopProducts from '@/components/dashboard/TopProducts'
import RecentAssets from '@/components/dashboard/RecentAssets'
import ReviewQueue from '@/components/dashboard/ReviewQueue'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col lg:flex-row gap-4">

        {/* Left column */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <KpiCards />
          <AssetTrendChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductsAddedChart />
            <ReadinessCard />
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
          <TopProducts />
          <ProductStatusChart />
          <RecentAssets />
        </div>

      </div>

      <ReviewQueue />

    </div>
  )
}

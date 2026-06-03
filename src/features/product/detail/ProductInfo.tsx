import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ProductWithRelations } from '@/types/product.types'

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-text-muted">{label}</p>
      <div className="text-sm font-medium text-text">{value}</div>
    </div>
  )
}

export function ProductInfo({ product }: { product: ProductWithRelations }) {
  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Product Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Product Code" value={product.productCode} />
          <Field label="Brand"        value={product.brand.name} />
          <Field label="Category"     value={product.category.name} />
          <Field label="Season"       value={product.season} />
          <Field
            label="Target Market"
            value={
              <div className="flex flex-wrap gap-1 mt-0.5">
                {product.targetMarket.map(m => (
                  <span
                    key={m}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {m}
                  </span>
                ))}
              </div>
            }
          />
          <Field
            label="Created"
            value={new Date(product.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs text-text-muted">Description</p>
          <p className="text-sm text-text leading-relaxed">{product.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

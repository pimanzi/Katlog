import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save } from 'lucide-react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUpdateProduct } from '@/hooks/products'
import { calculateReadiness, type ReadinessResult } from '@/utils/calculateReadiness'
import { mockBrands } from '@/data/mockBrands'
import { mockCategories } from '@/data/mockCategories'
import type { Season, TargetMarket, ProductStatus, ProductWithRelations } from '@/types/product.types'
import type { Variant } from '@/types/variant.types'
import type { Asset } from '@/types/asset.types'

const schema = z.object({
  name:         z.string().min(3, 'Name must be at least 3 characters'),
  productCode:  z.string().min(1, 'Product code is required'),
  brandId:      z.string().min(1, 'Please select a brand'),
  categoryId:   z.string().min(1, 'Please select a category'),
  description:  z.string().min(10, 'Description must be at least 10 characters'),
  targetMarket: z.array(z.string()).min(1, 'Select at least one target market'),
  season:       z.string().min(1, 'Please select a season'),
  status:       z.string().min(1, 'Please select a status'),
})

type FormValues = z.infer<typeof schema>

const TARGET_MARKETS: TargetMarket[] = ['Men', 'Women', 'Boys', 'Girls', 'Unisex', 'Adults', 'All']
const SEASONS: Season[]              = ['Spring', 'Summer', 'Autumn', 'Winter']
const STATUS_LABELS: Record<ProductStatus, string> = {
  draft:     'Draft',
  review:    'In Review',
  published: 'Published',
  archived:  'Archived',
}

interface Props {
  product:  ProductWithRelations
  variants: Variant[]
  assets:   Asset[]
}

export function EditProductForm({ product, variants, assets }: Props) {
  const navigate       = useNavigate()
  const updateProduct  = useUpdateProduct()

  const readiness: ReadinessResult = useMemo(
    () => calculateReadiness(product, variants, assets),
    [product, variants, assets]
  )

  const availableStatuses = useMemo<ProductStatus[]>(() => {
    const statuses = new Set<ProductStatus>(['draft', product.status])
    if (readiness.canSubmitForReview) statuses.add('review')
    if (readiness.canPublish)         statuses.add('published')
    if (product.status === 'published' || product.status === 'archived') statuses.add('archived')
    return Array.from(statuses)
  }, [product.status, readiness])

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:         product.name,
      productCode:  product.productCode,
      brandId:      String(product.brand.id),
      categoryId:   String(product.category.id),
      description:  product.description,
      targetMarket: product.targetMarket,
      season:       product.season,
      status:       product.status,
    },
  })

  const selectedMarkets = useWatch({ control, name: 'targetMarket' }) ?? []

  const toggleMarket = (market: TargetMarket) => {
    const updated = selectedMarkets.includes(market)
      ? selectedMarkets.filter(m => m !== market)
      : [...selectedMarkets, market]
    setValue('targetMarket', updated, { shouldValidate: true })
  }

  const onSubmit = (data: FormValues) => {
    updateProduct.mutate(
      {
        id: product.id,
        data: {
          name:         data.name,
          productCode:  data.productCode,
          brandId:      parseInt(data.brandId),
          categoryId:   parseInt(data.categoryId),
          description:  data.description,
          targetMarket: data.targetMarket as TargetMarket[],
          season:       data.season as Season,
          status:       data.status as ProductStatus,
        },
      },
      { onSuccess: () => navigate('/products') }
    )
  }

  const readinessHint =
    readiness.percentage < 75
      ? `Readiness at ${readiness.percentage}%. Add variants and approved assets to unlock "In Review".`
      : readiness.percentage < 100
      ? `Readiness at ${readiness.percentage}%. Get all assets approved to unlock "Published".`
      : 'Product is fully ready. All statuses are unlocked.'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Required fields for the product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name <span className="text-error">*</span></Label>
            <Input id="name" placeholder="e.g. Nike Air Max 2026" {...register('name')} />
            {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCode">Product Code <span className="text-error">*</span></Label>
            <Input id="productCode" placeholder="e.g. NK-AM-2026" {...register('productCode')} />
            {errors.productCode && <p className="text-xs text-error">{errors.productCode.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand <span className="text-error">*</span></Label>
              <Controller
                name="brandId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="brand"><SelectValue placeholder="Select brand" /></SelectTrigger>
                    <SelectContent>
                      {mockBrands.map(b => (
                        <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.brandId && <p className="text-xs text-error">{errors.brandId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category <span className="text-error">*</span></Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {mockCategories.map(c => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && <p className="text-xs text-error">{errors.categoryId.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
          <CardDescription>Required product details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-error">*</span></Label>
            <Textarea id="description" placeholder="Enter product description..." rows={4} {...register('description')} />
            {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Target Market <span className="text-error">*</span></Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {TARGET_MARKETS.map(market => (
                  <button
                    key={market}
                    type="button"
                    onClick={() => toggleMarket(market)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedMarkets.includes(market)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-transparent text-text-muted border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {market}
                  </button>
                ))}
              </div>
              {errors.targetMarket && <p className="text-xs text-error">{errors.targetMarket.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Season <span className="text-error">*</span></Label>
              <Controller
                name="season"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="season"><SelectValue placeholder="Select season" /></SelectTrigger>
                    <SelectContent>
                      {SEASONS.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.season && <p className="text-xs text-error">{errors.season.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>Control the visibility and lifecycle of this product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status"><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  {availableStatuses.map(s => (
                    <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && <p className="text-xs text-error">{errors.status.message}</p>}
          <p className="text-xs text-text-muted">{readinessHint}</p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3 pb-2">
        <Button type="button" variant="outline" onClick={() => navigate('/products')}>
          Cancel
        </Button>
        <Button type="submit" disabled={updateProduct.isPending}>
          <Save size={16} />
          {updateProduct.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}

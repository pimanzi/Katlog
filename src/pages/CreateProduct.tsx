import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateProduct } from '@/hooks/products'
import { mockBrands } from '@/data/mockBrands'
import { mockCategories } from '@/data/mockCategories'
import type { Season, TargetMarket } from '@/types/product.types'

const schema = z.object({
  name: z.string().min(1, 'Product name is required').min(3, 'Name must be at least 3 characters'),
  productCode: z.string().min(1, 'Product code is required'),
  brandId: z.string().min(1, 'Please select a brand'),
  categoryId: z.string().min(1, 'Please select a category'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  targetMarket: z.array(z.string()).min(1, 'Select at least one target market'),
  season: z.string().min(1, 'Please select a season'),
})

type FormValues = z.infer<typeof schema>

const TARGET_MARKETS: TargetMarket[] = ['Men', 'Women', 'Boys', 'Girls', 'Unisex', 'Adults', 'All']
const SEASONS: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter']

export default function CreateProduct() {
  const navigate = useNavigate()
  const createProduct = useCreateProduct()

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      productCode: '',
      brandId: '',
      categoryId: '',
      description: '',
      targetMarket: [],
      season: '',
    },
  })

  const selectedMarkets = watch('targetMarket') ?? []

  const toggleMarket = (market: TargetMarket) => {
    const updated = selectedMarkets.includes(market)
      ? selectedMarkets.filter(m => m !== market)
      : [...selectedMarkets, market]
    setValue('targetMarket', updated, { shouldValidate: true })
  }

  const onSubmit = (data: FormValues) => {
    createProduct.mutate(
      {
        name: data.name,
        productCode: data.productCode,
        brandId: parseInt(data.brandId),
        categoryId: parseInt(data.categoryId),
        status: 'draft',
        description: data.description,
        targetMarket: data.targetMarket as TargetMarket[],
        season: data.season as Season,
      },
      { onSuccess: () => navigate('/products') }
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate('/products')}
          className="shrink-0 text-primary hover:text-primary hover:bg-primary/10"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text">Create Product</h1>
          <p className="text-sm text-text-muted mt-1">Add a new product to your catalog</p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-draft-light bg-draft-light/40 px-4 py-3">
        <span className="mt-0.5 inline-flex items-center rounded-full bg-draft-light px-2.5 py-0.5 text-xs font-semibold text-draft shrink-0">
          Draft
        </span>
        <p className="text-sm text-text-muted">
          New products always start as <span className="font-medium text-text">Draft</span>. To improve readiness, add at least one variant and get an asset approved.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Required fields for product creation</CardDescription>
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
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
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
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
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
                      <SelectTrigger id="season">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
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

        <div className="flex items-center justify-end gap-3 pb-2">
          <Button type="button" variant="outline" onClick={() => navigate('/products')}>
            Cancel
          </Button>
          <Button type="submit" disabled={createProduct.isPending}>
            <Save size={16} />
            {createProduct.isPending ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateVariant, useUpdateVariant } from '@/hooks/variants'
import type { Variant } from '@/types/variant.types'

const schema = z.object({
  name:        z.string().min(1, 'Name is required'),
  variantCode: z.string().min(1, 'Variant code is required'),
  colour:      z.string().min(1, 'Colour is required'),
  size:        z.string().min(1, 'Size is required'),
  material:    z.string().min(1, 'Material is required'),
  barcode:     z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  productId: string
  variant?: Variant
  open: boolean
  onClose: () => void
}

export function VariantModal({ productId, variant, open, onClose }: Props) {
  const isEdit = !!variant
  const createVariant = useCreateVariant()
  const updateVariant = useUpdateVariant()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', variantCode: '', colour: '', size: '', material: '', barcode: '' },
  })

  useEffect(() => {
    if (variant) {
      reset({
        name:        variant.name,
        variantCode: variant.variantCode,
        colour:      variant.colour,
        size:        variant.size,
        material:    variant.material,
        barcode:     variant.barcode ?? '',
      })
    } else {
      reset({ name: '', variantCode: '', colour: '', size: '', material: '', barcode: '' })
    }
  }, [variant, open, reset])

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      variantCode: data.variantCode,
      colour: data.colour,
      size: data.size,
      material: data.material,
      barcode: data.barcode || undefined,
    }

    if (isEdit) {
      updateVariant.mutate(
        { id: variant.id, data: payload },
        { onSuccess: onClose }
      )
    } else {
      createVariant.mutate(
        { productId, ...payload },
        { onSuccess: onClose }
      )
    }
  }

  const isPending = createVariant.isPending || updateVariant.isPending

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="v-name">Name <span className="text-error">*</span></Label>
              <Input id="v-name" placeholder="e.g. Red Large" {...register('name')} />
              {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-code">Variant Code <span className="text-error">*</span></Label>
              <Input id="v-code" placeholder="e.g. VAR-001" {...register('variantCode')} />
              {errors.variantCode && <p className="text-xs text-error">{errors.variantCode.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-colour">Colour <span className="text-error">*</span></Label>
              <Input id="v-colour" placeholder="e.g. Red" {...register('colour')} />
              {errors.colour && <p className="text-xs text-error">{errors.colour.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-size">Size <span className="text-error">*</span></Label>
              <Input id="v-size" placeholder="e.g. L" {...register('size')} />
              {errors.size && <p className="text-xs text-error">{errors.size.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-material">Material <span className="text-error">*</span></Label>
              <Input id="v-material" placeholder="e.g. Cotton" {...register('material')} />
              {errors.material && <p className="text-xs text-error">{errors.material.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-barcode">Barcode</Label>
              <Input id="v-barcode" placeholder="Optional" {...register('barcode')} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (isEdit ? 'Saving...' : 'Adding...') : (isEdit ? 'Save Changes' : 'Add Variant')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

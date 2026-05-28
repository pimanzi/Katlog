import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUploadAsset } from '@/hooks/assets'
import type { AssetType } from '@/types/asset.types'

const ASSET_TYPES: AssetType[] = ['image', 'video', 'document', '3d']

const schema = z.object({
  title:       z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  assetType:   z.enum(['image', 'video', 'document', '3d'] as const),
  tags:        z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  productId: string
  variantId?: string
  open: boolean
  onClose: () => void
}

export function UploadAssetModal({ productId, variantId, open, onClose }: Props) {
  const uploadAsset = useUploadAsset()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError]       = useState<string | null>(null)

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', assetType: 'image', tags: '' },
  })

  const handleClose = () => {
    reset()
    setSelectedFile(null)
    setFileError(null)
    onClose()
  }

  const onSubmit = (data: FormValues) => {
    if (!selectedFile) {
      setFileError('Please select a file')
      return
    }
    uploadAsset.mutate(
      {
        data: {
          productId,
          variantId,
          title:       data.title,
          description: data.description,
          assetType:   data.assetType,
          tags: data.tags
            ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
            : [],
        },
        file: selectedFile,
      },
      { onSuccess: handleClose }
    )
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Asset</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="u-file">File <span className="text-error">*</span></Label>
            <label
              htmlFor="u-file"
              className="flex items-center gap-3 border border-border rounded-md px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Upload size={15} className="text-text-muted shrink-0" />
              <span className="text-sm text-text-muted truncate">
                {selectedFile ? selectedFile.name : 'Click to select a file'}
              </span>
            </label>
            <input
              type="file"
              id="u-file"
              accept="image/*,video/*,.pdf"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0] ?? null
                setSelectedFile(file)
                setFileError(null)
              }}
            />
            {fileError && <p className="text-xs text-error">{fileError}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="u-type">Asset Type <span className="text-error">*</span></Label>
            <Controller
              name="assetType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="u-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_TYPES.map(t => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.assetType && <p className="text-xs text-error">{errors.assetType.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="u-title">Title <span className="text-error">*</span></Label>
            <Input id="u-title" placeholder="e.g. Front view" {...register('title')} />
            {errors.title && <p className="text-xs text-error">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="u-desc">Description <span className="text-error">*</span></Label>
            <Textarea id="u-desc" placeholder="Brief description of this asset" rows={2} {...register('description')} />
            {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="u-tags">
              Tags <span className="text-text-muted text-xs">(comma separated)</span>
            </Label>
            <Input id="u-tags" placeholder="e.g. hero, front, studio" {...register('tags')} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={uploadAsset.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploadAsset.isPending}>
              {uploadAsset.isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

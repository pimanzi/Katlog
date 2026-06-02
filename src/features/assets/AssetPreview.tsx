import { FileText, Box, ImageIcon } from 'lucide-react'
import type { Asset } from '@/types/asset.types'

export function AssetPreview({ asset }: { asset: Asset }) {
  if (asset.assetType === 'image') {
    return (
      <div className="rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
        <img
          src={asset.url}
          alt={asset.title}
          className="w-full max-h-120 object-contain"
        />
      </div>
    )
  }

  if (asset.assetType === 'video') {
    return (
      <div className="rounded-xl overflow-hidden border border-border bg-black">
        <video src={asset.url} controls className="w-full max-h-120" />
      </div>
    )
  }

  const Icon = asset.assetType === '3d' ? Box : asset.assetType === 'document' ? FileText : ImageIcon

  return (
    <div className="rounded-xl border border-border bg-muted flex flex-col items-center justify-center py-20 gap-4">
      <Icon size={52} className="text-text-muted/50" />
      <p className="text-sm text-text-muted">{asset.title}</p>
      <a
        href={asset.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary underline underline-offset-2"
      >
        Open / Download
      </a>
    </div>
  )
}

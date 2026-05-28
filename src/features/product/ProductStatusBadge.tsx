type ProductStatus = 'draft' | 'review' | 'published' | 'archived' | 'ready'

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    draft:     'bg-draft-light text-draft',
    review:    'bg-review-light text-warning-text',
    published: 'bg-published-light text-success-text',
    archived:  'bg-archived-light text-archived',
    ready:     'bg-primary-light text-primary',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending:  'bg-pending-light text-primary',
    Approved: 'bg-approved-light text-success-text',
    Rejected: 'bg-rejected-light text-error-text',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${map[status] ?? 'bg-draft-light text-draft'}`}>
      {status}
    </span>
  )
}

function getReadinessColor(percentage: number): string {
  if (percentage === 100) return '#22c55e'
  if (percentage >= 75) return '#3C83F7'
  if (percentage >= 41) return '#f59e0b'
  return '#ef4444'
}

export function ReadinessBar({ percentage }: { percentage: number }) {
  const color = getReadinessColor(percentage)

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] font-semibold text-text w-8 text-right">{percentage}%</span>
    </div>
  )
}

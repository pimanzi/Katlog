import {
  formatDistanceToNow,
  subMonths,
  subDays,
  startOfMonth,
  startOfDay,
  endOfDay,
  eachDayOfInterval,
  isWithinInterval,
  format,
  isAfter,
  subHours,
} from 'date-fns'
import type { Asset } from '@/types/asset.types'

export function timeAgo(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
}

export function formatWaiting(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr))
}

export function isUrgent(dateStr: string): boolean {
  return isAfter(subHours(new Date(), 24), new Date(dateStr))
}

export function groupAssetsByRange(
  assets: Asset[],
  start: Date,
  end: Date
): { date: string; uploaded: number; approved: number }[] {
  const range      = { start: startOfDay(start), end: endOfDay(end) }
  const uploadedMap = new Map<string, number>()
  const approvedMap = new Map<string, number>()

  assets.forEach(asset => {
    const uploaded = new Date(asset.uploadedAt)
    if (isWithinInterval(uploaded, range)) {
      const key = format(uploaded, 'yyyy-MM-dd')
      uploadedMap.set(key, (uploadedMap.get(key) ?? 0) + 1)
    }
    const approvalEntry = asset.statusHistory.find(h => h.status === 'approved')
    if (approvalEntry) {
      const approved = new Date(approvalEntry.changedAt)
      if (isWithinInterval(approved, range)) {
        const key = format(approved, 'yyyy-MM-dd')
        approvedMap.set(key, (approvedMap.get(key) ?? 0) + 1)
      }
    }
  })

  return eachDayOfInterval({ start: range.start, end: range.end }).map(day => {
    const key = format(day, 'yyyy-MM-dd')
    return { date: key, uploaded: uploadedMap.get(key) ?? 0, approved: approvedMap.get(key) ?? 0 }
  })
}

export function getHalfYearRange(half: 'h1' | 'h2'): { start: Date; end: Date } {
  const year = new Date().getFullYear()
  return half === 'h1'
    ? { start: new Date(year, 0, 1),  end: new Date(year, 5, 30) }
    : { start: new Date(year, 6, 1),  end: new Date(year, 11, 31) }
}

export function groupAssetsByDate(
  assets: Asset[],
  days: number
): { date: string; uploaded: number; approved: number }[] {
  const end   = new Date()
  const start = subDays(end, days - 1)
  return groupAssetsByRange(assets, start, end)
}

export function getLast7Months(): { key: string; label: string; count: number }[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = startOfMonth(subMonths(new Date(), 6 - i))
    return {
      key:   format(d, 'yyyy-MM'),
      label: format(d, 'MMM'),
      count: 0,
    }
  })
}

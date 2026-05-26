import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<"button">

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors",
        "h-9 w-9",
        "border border-border bg-card hover:bg-primary hover:text-white hover:border-primary",
        isActive && "bg-primary text-white border-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      aria-label="Go to previous page"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors",
        "h-9 px-3 gap-1",
        "border border-border bg-card hover:bg-primary hover:text-white hover:border-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </button>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      aria-label="Go to next page"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors",
        "h-9 px-3 gap-1",
        "border border-border bg-card hover:bg-primary hover:text-white hover:border-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4 text-text-muted" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

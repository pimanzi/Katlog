import { CalendarDays, Bell, Sun, Moon, Search, Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'



interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
   const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000) 

    return () => clearInterval(interval) 
  }, [])

  const hour     = now.getHours()
  const dayName  = now.toLocaleDateString('en-US', { weekday: 'long' })
  const monthDay = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  const year     = now.getFullYear()
  const greeting =
    hour < 12 ? 'Good morning,' :
    hour < 18 ? 'Good afternoon,' :
    'Good evening,'

  return (
    <header className="flex items-center h-16 px-4 md:px-6 bg-card border-b border-border w-full gap-3 md:gap-6 shrink-0">

      {/* Hamburger mobile only */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors shrink-0"
      >
        <Menu size={20} />
      </button>

      <div className="lg:hidden shrink-0">
        <Logo variant="dark" size={28} />
      </div>

      <div className="hidden lg:flex items-center gap-3 shrink-0">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-light shrink-0">
          {hour >= 18 ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-primary" />}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] font-semibold text-text leading-tight">
            {greeting} <span className="text-primary">James!</span>
          </p>
          <div className="flex items-center gap-1.5">
            <CalendarDays size={12} className="text-text-muted" />
            <span className="text-xs text-text-muted font-normal whitespace-nowrap">
              {dayName}, {monthDay} · {year}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-auto">
        <div className="flex items-center gap-2 w-full bg-bg border border-border rounded-xl px-3.5 h-10 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light transition-all">
          <Search size={15} className="text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search products, assets..."
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
          />
        </div>
      </div>

      <div className="flex-1 lg:hidden" />

      <div className="flex items-center gap-2 md:gap-3 shrink-0">

        <button className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-bg border border-border hover:border-primary hover:bg-primary-light transition-colors cursor-pointer">
          <Bell size={16} className="text-text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error border-2 border-card" />
        </button>

        <Avatar className="w-9 h-9 md:w-10 md:h-10 cursor-pointer shrink-0 border-2 border-primary">
          <AvatarFallback className="bg-primary-light text-primary text-xs md:text-sm font-semibold">JD</AvatarFallback>
        </Avatar>

      </div>
    </header>
  )
}

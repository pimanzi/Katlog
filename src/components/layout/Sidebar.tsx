import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Image, CheckSquare, X, ChevronDown, Plus, List } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { 
    label: 'Products', 
    icon: Package, 
    to: '/products',
    subItems: [
      { label: 'All Products', to: '/products', icon: List },
      { label: 'Create Product', to: '/products/create', icon: Plus },
    ]
  },
  { label: 'Assets', icon: Image, to: '/assets' },
  { label: 'Review Queue', icon: CheckSquare, to: '/review-queue' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openProducts, setOpenProducts] = useState(true)
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        flex flex-col w-60 h-screen bg-sidebar fixed left-0 top-0 z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <Logo variant="light" size={36} />
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-4 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const hasSubItems = item.subItems && item.subItems.length > 0

            if (hasSubItems) {
              return (
                <Collapsible
                  key={item.to}
                  open={openProducts}
                  onOpenChange={setOpenProducts}
                >
                  <CollapsibleTrigger className="w-full">
                    <div
                      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-[#94a3c4] hover:bg-white/5 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {item.label}
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openProducts ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1">
                    <div className="flex flex-col gap-1 ml-6">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon
                        return (
                          <NavLink
                            key={subItem.to}
                            to={subItem.to}
                            onClick={onClose}
                            end
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                  ? 'bg-primary text-white'
                                  : 'text-[#94a3c4] hover:bg-white/5 hover:text-white'
                              }`
                            }
                          >
                            {SubIcon && <SubIcon size={14} />}
                            {subItem.label}
                          </NavLink>
                        )
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-[#94a3c4] hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* User area */}
        <div className="px-4 py-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-primary text-white text-xs font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium leading-none truncate">James Dylan</p>
              <p className="text-[#94a3c4] text-xs mt-0.5 truncate">Brand Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

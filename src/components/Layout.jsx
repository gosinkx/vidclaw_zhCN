import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import UsageWidget from './Usage/UsageWidget'
import { LayoutDashboard, Calendar, FolderOpen, Puzzle, Heart, Settings, Menu, X } from 'lucide-react'

const navItems = [
  { id: 'kanban', label: '任务看板', icon: LayoutDashboard },
  { id: 'calendar', label: '活动日历', icon: Calendar },
  { id: 'files', label: '文件浏览器', icon: FolderOpen },
  { id: 'skills', label: '技能管理', icon: Puzzle },
  { id: 'soul', label: '灵魂编辑', icon: Heart },
  { id: 'settings', label: '设置', icon: Settings },
]

export default function Layout({ page, setPage, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on page change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [page])

  // Close sidebar on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 移动端遮罩层 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside className={cn(
        'w-56 shrink-0 border-r border-border bg-card flex flex-col z-50 transition-transform duration-200',
        // 移动端：固定覆盖，默认隐藏
        'fixed inset-y-0 left-0 md:relative md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              ⚡ VidClaw
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">控制中心 (Clawmand Center)</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                page === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border text-xs text-muted-foreground">
          localhost:3333
        </div>
      </aside>

      {/* 主界面 */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu size={20} />
            </button>
            <span className="text-sm font-medium capitalize">{page === 'kanban' ? '任务看板' : page === 'calendar' ? '活动日历' : page === 'skills' ? '技能管理' : page === 'soul' ? '灵魂编辑器' : page === 'settings' ? '设置' : '文件浏览器'}</span>
          </div>
          <UsageWidget />
        </header>
        <main className="flex-1 overflow-auto p-2 sm:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

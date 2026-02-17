import React, { useState, useEffect } from 'react'
import { Settings, Clock, Save, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const HEARTBEAT_OPTIONS = [
  { value: '5m', label: '5 分钟' },
  { value: '10m', label: '10 分钟' },
  { value: '15m', label: '15 分钟' },
  { value: '30m', label: '30 分钟' },
  { value: '1h', label: '1 小时' },
]

export default function SettingsPage() {
  const [heartbeat, setHeartbeat] = useState('30m')
  const [savedHeartbeat, setSavedHeartbeat] = useState('30m')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  const isDirty = heartbeat !== savedHeartbeat

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        setHeartbeat(d.heartbeatEvery || '30m')
        setSavedHeartbeat(d.heartbeatEvery || '30m')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const r = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heartbeatEvery: heartbeat }),
      })
      if (!r.ok) throw new Error('保存失败')
      setSavedHeartbeat(heartbeat)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" size={18} /> 正在加载设置…
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Settings size={20} className="text-primary" />
        <h2 className="text-lg font-semibold">系统设置 (Settings)</h2>
      </div>

      {/* Heartbeat Section */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-400" />
          <h3 className="font-medium text-sm">心跳频率 (Heartbeat Frequency)</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          代理检查任务的频率。值越低响应越快，但会消耗更多 API 资源。
        </p>
        <div className="flex flex-wrap gap-2">
          {HEARTBEAT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setHeartbeat(opt.value)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm border transition-colors',
                heartbeat === opt.value
                  ? 'border-primary bg-primary/10 text-primary font-medium'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
            isDirty
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {saving ? <Loader2 className="animate-spin" size={14} /> : saved ? <Check size={14} /> : <Save size={14} />}
          {saving ? '正在保存…' : saved ? '已保存并正在重启' : '保存设置'}
        </button>
        {saved && (
          <span className="text-xs text-green-400">OpenClaw 正在使用新设置重启…</span>
        )}
      </div>
    </div>
  )
}

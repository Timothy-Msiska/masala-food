'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEMO_DATA, type DemoRecord } from '@/components/dashboard-data'

type DashboardStore = {
  records: Record<string, DemoRecord[]>
  addRecord: (key: string, record: DemoRecord) => void
  updateRecord: (key: string, id: string, patch: Partial<DemoRecord>) => void
  removeRecord: (key: string, id: string) => void
  updateAll: (key: string, patch: Partial<DemoRecord>) => void
}

const DashboardStoreContext = createContext<DashboardStore | null>(null)
const SESSION_STORAGE_KEY = 'masala-food-demo-records-v1'

export function DashboardStoreProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<Record<string, DemoRecord[]>>(() =>
    Object.fromEntries(Object.entries(DEMO_DATA).map(([key, rows]) => [key, rows.map((row) => ({ ...row }))])),
  )
  const [hasLoadedSession, setHasLoadedSession] = useState(false)

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, unknown>
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setRecords((current) => Object.fromEntries(Object.entries(current).map(([key, fallback]) => [
            key,
            Array.isArray(parsed[key]) ? parsed[key] as DemoRecord[] : fallback,
          ])))
        }
      }
    } catch {
      // In-memory demo data remains usable when browser storage is unavailable.
    }
    setHasLoadedSession(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedSession) return
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(records))
    } catch {
      // Demo changes remain in memory if browser storage is unavailable.
    }
  }, [hasLoadedSession, records])

  const store = useMemo<DashboardStore>(() => {
    const withActivity = (current: Record<string, DemoRecord[]>, key: string, verb: string, id: string) => {
      if (key === 'activity') return current
      const activity: DemoRecord = {
        id: `ACT-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        reference: id,
        name: `${verb} ${key.replaceAll('-', ' ')}`,
        actor: 'Demo session user',
        activity: `${verb}: ${id}`,
        record: id,
        status: 'Complete',
        updated: 'Just now',
      }
      return { ...current, activity: [activity, ...(current.activity ?? [])] }
    }

    return {
      records,
      addRecord: (key, record) => setRecords((current) => withActivity({ ...current, [key]: [record, ...(current[key] ?? [])] }, key, 'Created', record.reference ?? record.id)),
      updateRecord: (key, id, patch) => setRecords((current) => withActivity({ ...current, [key]: (current[key] ?? []).map((record) => record.id === id ? { ...record, ...patch } : record) }, key, 'Updated', id)),
      removeRecord: (key, id) => setRecords((current) => withActivity({ ...current, [key]: (current[key] ?? []).filter((record) => record.id !== id) }, key, 'Removed', id)),
      updateAll: (key, patch) => setRecords((current) => withActivity({ ...current, [key]: (current[key] ?? []).map((record) => ({ ...record, ...patch })) }, key, 'Updated all', key)),
    }
  }, [records])

  return <DashboardStoreContext.Provider value={store}>{children}</DashboardStoreContext.Provider>
}

export function useDashboardStore() {
  const context = useContext(DashboardStoreContext)
  if (!context) throw new Error('useDashboardStore must be used inside DashboardStoreProvider')
  return context
}

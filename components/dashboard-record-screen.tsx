'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, BellRing, Check, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, CircleX, ClipboardCheck, Copy, Download, Eye, FilePenLine, Heart, MoreHorizontal, PackageCheck, Plus, Search, Send, ShieldCheck, Trash2, Truck, UserRoundCheck, X } from 'lucide-react'
import type { DashboardRole, DashboardScreen, DemoRecord } from '@/components/dashboard-data'

export type DashboardAction = 'view' | 'edit' | 'approve' | 'reject' | 'suspend' | 'reactivate' | 'remove' | 'submit' | 'enquire' | 'save' | 'respond' | 'create-quote' | 'send-quote' | 'accept' | 'reject-quote' | 'confirm-order' | 'cancel' | 'assign-provider' | 'milestone' | 'confirm-delivery' | 'report-issue' | 'review-payment' | 'verify-payment' | 'reject-payment' | 'mark-read' | 'copy-link' | 'decline' | 'record-pod' | 'submit-reference' | 'submit-transport-quote'

export type RowAction = { id: DashboardAction; label: string; icon: typeof Eye; tone?: 'positive' | 'danger' | 'neutral' }

const action = (id: DashboardAction, label: string, icon: typeof Eye, tone: RowAction['tone'] = 'neutral'): RowAction => ({ id, label, icon, tone })

export function getRowActions(role: DashboardRole, section: string, record: DemoRecord): RowAction[] {
  const view = action('view', 'View', Eye)
  if (section === 'members' && role === 'Administrator') {
    if (record.status === 'Pending review' || record.status === 'Needs information') return [view, action('approve', 'Approve', CircleCheck, 'positive'), action('reject', 'Reject', CircleX, 'danger')]
    if (record.status === 'Verified') return [view, action('suspend', 'Suspend', CircleAlert, 'danger')]
    if (record.status === 'Suspended') return [view, action('reactivate', 'Reactivate', UserRoundCheck, 'positive')]
    return [view, action('edit', 'Edit', FilePenLine)]
  }
  if (section === 'categories' && role === 'Administrator') return [view, action('edit', 'Edit', FilePenLine), action('remove', 'Remove', Trash2, 'danger')]
  if (section === 'marketplace' || section === 'products' || section === 'inventory') {
    if (role === 'Buyer' && section === 'marketplace') return [view, action('enquire', 'Enquire', Send, 'positive'), action('save', 'Save', Heart)]
    if (role === 'Supplier') return [view, action('edit', 'Edit', FilePenLine), ...(record.status === 'Draft' || record.status === 'Rejected' ? [action('submit', 'Submit for review', Send, 'positive')] : []), action('remove', 'Remove', Trash2, 'danger')]
    if (role === 'Administrator' && record.status === 'Pending approval') return [view, action('approve', 'Approve', CircleCheck, 'positive'), action('reject', 'Reject', CircleX, 'danger')]
    return [view, action('edit', 'Edit', FilePenLine)]
  }
  if (section === 'enquiries') {
    if (role === 'Supplier') return [view, action('respond', 'Respond', Send, 'positive'), action('create-quote', 'Create quote', FilePenLine)]
    if (role === 'Buyer') return [view, action('edit', 'Edit', FilePenLine), action('cancel', 'Cancel', X, 'danger')]
    return [view]
  }
  if (section === 'quotations') {
    if (role === 'Buyer' && (record.status === 'Pending' || record.status === 'Sent')) return [view, action('accept', 'Accept', CircleCheck, 'positive'), action('reject-quote', 'Reject', CircleX, 'danger')]
    if (role === 'Supplier') return [view, action('edit', 'Edit', FilePenLine), ...(record.status === 'Draft' ? [action('send-quote', 'Send', Send, 'positive')] : [])]
    return [view]
  }
  if (section === 'orders') {
    if (role === 'Administrator') return [view, action('assign-provider', 'Assign logistics', Truck, 'positive')]
    if (role === 'Supplier') return [view, action('confirm-order', 'Update fulfilment', PackageCheck, 'positive')]
    if (role === 'Buyer') return [view, action('cancel', 'Request cancellation', X, 'danger')]
    return [view]
  }
  if (section === 'shipments') {
    if (role === 'Administrator') return [view, action('assign-provider', 'Assign provider', Truck, 'positive')]
    if (role === 'Logistics') return [view, ...(record.status.toLowerCase().includes('delivered') ? [] : [action('milestone', 'Update milestone', PackageCheck, 'positive')]), ...(record.status.toLowerCase().includes('delivered') ? [action('record-pod', 'Record delivery', ClipboardCheck, 'positive')] : [])]
    if (role === 'Buyer') return [view, ...(record.status.toLowerCase().includes('delivered') ? [action('confirm-delivery', 'Confirm delivery', CircleCheck, 'positive')] : []), action('report-issue', 'Report issue', CircleAlert, 'danger')]
    return [view]
  }
  if (section === 'invoices') {
    if (role === 'Buyer') return [view, ...(record.status === 'Unpaid' || record.status === 'Rejected' ? [action('submit-reference', 'Submit reference', Send, 'positive')] : [])]
    if (role === 'Administrator' && record.status === 'Reference submitted') return [view, action('review-payment', 'Start review', ShieldCheck, 'positive')]
    if (role === 'Administrator' && record.status === 'Pending verification') return [view, action('verify-payment', 'Verify reference', CircleCheck, 'positive'), action('reject-payment', 'Reject reference', CircleX, 'danger')]
    return [view]
  }
  if (section === 'documents') {
    if (role === 'Administrator' && (record.status === 'Pending review' || record.status === 'Pending')) return [view, action('approve', 'Approve', CircleCheck, 'positive'), action('reject', 'Reject', CircleX, 'danger')]
    if (role === 'Supplier' || role === 'Buyer' || role === 'Logistics') return [view, action('edit', 'Replace details', FilePenLine), action('submit', 'Submit for review', Send, 'positive')]
    return [view]
  }
  if (section === 'transport-requests') {
    if (role === 'Logistics' && record.status === 'Open') return [view, action('submit-transport-quote', 'Submit quote', Send, 'positive')]
    if (role === 'Logistics' && record.status === 'Assigned') return [view, action('accept', 'Accept assignment', CircleCheck, 'positive'), action('decline', 'Decline', CircleX, 'danger')]
    if (role === 'Logistics') return [view]
    if (role === 'Administrator') return [view, action('assign-provider', 'Assign provider', Truck, 'positive')]
    return [view]
  }
  if (section === 'proof-of-delivery') {
    if (role === 'Logistics') return [view, action('record-pod', 'Record delivery', ClipboardCheck, 'positive')]
    if (role === 'Buyer') return [view, ...(record.status.toLowerCase().includes('delivered') ? [action('confirm-delivery', 'Confirm delivery', CircleCheck, 'positive')] : []), action('report-issue', 'Report issue', CircleAlert, 'danger')]
    return [view]
  }
  if (section === 'commissions' && role === 'Administrator' && record.status === 'Pending') return [view, action('approve', 'Approve', CircleCheck, 'positive'), action('reject', 'Reject', CircleX, 'danger')]
  if (section === 'referrals' && role === 'Marketing') return [view, action('copy-link', 'Copy link', Copy, 'positive')]
  if (section === 'notifications') return record.status === 'Unread' ? [view, action('mark-read', 'Mark read', BellRing, 'positive')] : [view]
  if (section === 'support') return [view, action('edit', 'Add update', FilePenLine)]
  if (section === 'profile' || section === 'settings') return [view, action('edit', 'Edit', FilePenLine)]
  if (section === 'saved-products') return [view, action('remove', 'Remove saved item', Trash2, 'danger')]
  if (section === 'reports' || section === 'activity' || section === 'transactions') return [view]
  return [view, action('edit', 'Edit', FilePenLine)]
}

const statusClass = (status: string) => {
  const value = status.toLowerCase()
  if (value.includes('approved') || value.includes('verified') || value.includes('delivered') || value.includes('eligible') || value === 'read' || value === 'complete' || value === 'accepted' || value === 'confirmed') return 'is-positive'
  if (value.includes('reject') || value.includes('cancel') || value.includes('suspend') || value.includes('dispute') || value.includes('failed') || value.includes('out of stock') || value.includes('ineligible')) return 'is-danger'
  if (value.includes('pending') || value.includes('review') || value.includes('transit') || value.includes('delay') || value.includes('unread') || value.includes('open') || value.includes('low stock') || value.includes('awaiting')) return 'is-warning'
  return 'is-neutral'
}

function formatCell(value: string | undefined) {
  return value?.trim() || '—'
}

type Props = {
  role: DashboardRole
  section: string
  screen: DashboardScreen
  rows: DemoRecord[]
  onPrimary: () => void
  onAction: (action: DashboardAction, row: DemoRecord) => void
  onMarkAllRead: () => void
  onExport: (rows: DemoRecord[]) => void
}

export function DashboardRecordScreen({ role, section, screen, rows, onPrimary, onAction, onMarkAllRead, onExport }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [periodFilter, setPeriodFilter] = useState('All reporting periods')
  const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: screen.columns[0]?.key ?? 'name', direction: 'asc' })
  const [page, setPage] = useState(1)
  const pageSize = 5
  const statuses = useMemo(() => Array.from(new Set(rows.map((row) => row.status))).sort(), [rows])
  const categories = useMemo(() => Array.from(new Set(rows.map((row) => row.category).filter((value): value is string => Boolean(value)))).sort(), [rows])
  const periods = useMemo(() => Array.from(new Set(rows.map((row) => row.period).filter((value): value is string => Boolean(value)))).sort((left, right) => new Date(`1 ${right}`).getTime() - new Date(`1 ${left}`).getTime()), [rows])
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return rows
      .filter((row) => statusFilter === 'All statuses' || row.status === statusFilter)
      .filter((row) => section !== 'reports' || categoryFilter === 'All categories' || row.category === categoryFilter)
      .filter((row) => section !== 'reports' || periodFilter === 'All reporting periods' || row.period === periodFilter)
      .filter((row) => !term || Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(term)))
      .sort((left, right) => {
        const a = String(left[sort.key] ?? '').toLowerCase()
        const b = String(right[sort.key] ?? '').toLowerCase()
        return a.localeCompare(b, undefined, { numeric: true }) * (sort.direction === 'asc' ? 1 : -1)
      })
  }, [rows, search, sort, statusFilter, section, categoryFilter, periodFilter])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visibleRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const toggleSort = (key: string) => {
    setSort((current) => ({ key, direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc' }))
    setPage(1)
  }

  const primaryExport = screen.primaryAction?.toLowerCase().includes('export')
  const primaryMarkRead = section === 'notifications' && screen.primaryAction === 'Mark all read'

  return (
    <section className="app-dashboard-page-content" aria-labelledby="screen-title">
      <div className="app-dashboard-screen-heading">
        <div>
          <p className="app-dashboard-kicker">Workspace / {screen.title}</p>
          <h2 id="screen-title">{screen.title}</h2>
          <p className="app-dashboard-screen-description">{screen.description}</p>
        </div>
        {screen.primaryAction && <button type="button" className="app-dashboard-primary" onClick={primaryExport ? () => onExport(filtered) : primaryMarkRead ? onMarkAllRead : onPrimary}>
          {primaryExport ? <Download size={16} /> : primaryMarkRead ? <Check size={16} /> : <Plus size={17} />}
          {screen.primaryAction}
        </button>}
      </div>

      <div className="app-dashboard-demo-note"><CircleAlert size={15} /><span>{screen.demoNote}</span></div>

      {section === 'reports' && <div className="app-dashboard-report-filters">
        <label className="app-dashboard-filter"><span className="sr-only">Filter by report category</span><select value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setPage(1) }}><option>All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="app-dashboard-filter"><span className="sr-only">Filter by reporting period</span><select value={periodFilter} onChange={(event) => { setPeriodFilter(event.target.value); setPage(1) }}><option>All reporting periods</option>{periods.map((period) => <option key={period}>{period}</option>)}</select></label>
      </div>}

      <div className="app-dashboard-toolbar">
        <label className="app-dashboard-search"><Search size={16} /><span className="sr-only">Search {screen.title.toLowerCase()}</span><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder={`Search ${screen.title.toLowerCase()}…`} /></label>
        <label className="app-dashboard-filter"><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1) }}><option>All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        {section === 'notifications' && <button type="button" className="app-dashboard-secondary" onClick={onMarkAllRead}>Mark all read</button>}
      </div>

      <div className="app-dashboard-table-card">
        <div className="app-dashboard-table-scroll">
          <table className="app-dashboard-table">
            <thead><tr>{screen.columns.map((column) => <th key={column.key} scope="col"><button type="button" className="app-dashboard-sort" onClick={() => toggleSort(column.key)} aria-label={`Sort by ${column.label}`}>{column.label}{sort.key === column.key ? sort.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} /> : <ArrowUpDown size={12} />}</button></th>)}<th scope="col"><span className="sr-only">Row actions</span></th></tr></thead>
            <tbody>
              {visibleRows.map((row) => <tr key={row.id}>
                {screen.columns.map((column) => <td key={column.key}>
                  {column.key === 'status' ? <span className={`app-dashboard-status ${statusClass(formatCell(row[column.key]))}`}>{row[column.key]}</span> : <span className={column.key === screen.columns[0]?.key ? 'app-dashboard-cell-primary' : ''}>{formatCell(row[column.key])}</span>}
                </td>)}
                <td><div className="app-dashboard-row-actions">{getRowActions(role, section, row).map(({ id, label, icon: Icon, tone }) => <button key={id} type="button" className={`app-dashboard-row-action ${tone ? `tone-${tone}` : ''}`} onClick={() => onAction(id, row)} aria-label={`${label}: ${row.name}`} title={label}><Icon size={14} /><span>{label}</span></button>)}<button type="button" className="app-dashboard-row-action app-dashboard-more" onClick={() => onAction('view', row)} aria-label={`More details for ${row.name}`} title="More details"><MoreHorizontal size={16} /></button></div></td>
              </tr>)}
            </tbody>
          </table>
          {!visibleRows.length && <div className="app-dashboard-empty"><span className="app-dashboard-empty-icon"><Search size={20} /></span><strong>{rows.length ? 'No matching records' : 'Nothing here yet'}</strong><p>{rows.length ? 'Adjust your search or filters to see more records.' : 'Create a record or check back when new work arrives.'}</p>{(search || statusFilter !== 'All statuses' || categoryFilter !== 'All categories' || periodFilter !== 'All reporting periods') && <button type="button" className="app-dashboard-secondary" onClick={() => { setSearch(''); setStatusFilter('All statuses'); setCategoryFilter('All categories'); setPeriodFilter('All reporting periods'); setPage(1) }}>Clear filters</button>}</div>}
        </div>
        <footer className="app-dashboard-table-footer"><span>Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} records</span><div><button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage <= 1} aria-label="Previous page"><ChevronLeft size={16} /></button><span>Page {currentPage} of {pageCount}</span><button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage >= pageCount} aria-label="Next page"><ChevronRight size={16} /></button></div></footer>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  Activity, ArrowRight, BadgeCheck, Bell, BriefcaseBusiness, ChartNoAxesCombined,
  Check, ChevronDown, CircleAlert, CircleDollarSign, ClipboardList, FileCheck2, FileText, Heart,
  LayoutDashboard, LogOut, Menu, MessageSquareText, Package, PackageCheck, Plus, Settings, ShieldCheck,
  Truck, Users, X, type LucideIcon,
} from 'lucide-react'
import {
  DASHBOARD_NAVIGATION, getDashboardScreen, getOverviewMetrics, getPrimaryTarget, isDashboardRole,
  type DashboardRole, type DemoRecord,
} from '@/components/dashboard-data'
import { DashboardRecordScreen, type DashboardAction } from '@/components/dashboard-record-screen'
import { useDashboardStore } from '@/components/dashboard-store'

const iconMap: Record<string, LucideIcon> = {
  overview: LayoutDashboard,
  members: Users,
  products: Package,
  enquiries: MessageSquareText,
  orders: ClipboardList,
  shipments: Truck,
  finance: CircleDollarSign,
  documents: FileCheck2,
  reports: ChartNoAxesCombined,
  activity: Activity,
  settings: Settings,
  inventory: PackageCheck,
  quotations: FileText,
  profile: BriefcaseBusiness,
  notifications: Bell,
  support: MessageSquareText,
  saved: Heart,
  referrals: Users,
  transactions: CircleDollarSign,
  commissions: CircleDollarSign,
  requests: Truck,
  proof: BadgeCheck,
}

type Field = { name: string; label: string; type?: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea' | 'file'; required?: boolean; options?: string[]; placeholder?: string }
type Overlay =
  | { kind: 'form'; title: string; targetKey: string; section: string; record?: DemoRecord; initialValues?: Partial<DemoRecord>; fields: Field[]; special?: 'payment' | 'transport-quote' | 'respond' }
  | { kind: 'detail'; record: DemoRecord }
  | { kind: 'confirm'; action: DashboardAction; record: DemoRecord; sourceKey: string; section: string }

const sharedFields: Record<string, Field[]> = {
  members: [
    { name: 'name', label: 'Business / member name', required: true },
    { name: 'email', label: 'Contact email', required: true, type: 'email' },
    { name: 'role', label: 'Workspace role', required: true, type: 'select', options: ['Supplier', 'Buyer', 'Marketing', 'Logistics'] },
  ],
  categories: [
    { name: 'name', label: 'Category name', required: true },
    { name: 'description', label: 'Description', required: true },
    { name: 'scope', label: 'Applies to', required: true, type: 'select', options: ['Marketplace', 'Supplier listings'] },
  ],
  products: [
    { name: 'name', label: 'Product name', required: true },
    { name: 'category', label: 'Category', required: true, type: 'select', options: ['Grains', 'Legumes', 'Oils', 'Fresh produce', 'Other'] },
    { name: 'quantity', label: 'Available quantity', required: true, type: 'number' },
    { name: 'unit', label: 'Unit', required: true, type: 'select', options: ['tonnes', 'kilograms', 'litres', 'cases'] },
    { name: 'price', label: 'Unit price and currency', required: true, placeholder: 'e.g. MWK 685,000 per tonne' },
    { name: 'image', label: 'Product image', type: 'file' },
  ],
  enquiries: [
    { name: 'product', label: 'Product / commodity', required: true },
    { name: 'quantity', label: 'Requested quantity', required: true },
    { name: 'destination', label: 'Delivery destination', required: true },
    { name: 'buyer', label: 'Buyer business', required: true },
    { name: 'requirements', label: 'Additional requirements', type: 'textarea' },
  ],
  quotations: [
    { name: 'product', label: 'Product / commodity', required: true },
    { name: 'buyer', label: 'Buyer business', required: true },
    { name: 'quantity', label: 'Quantity', required: true },
    { name: 'amount', label: 'Quoted total and currency', required: true, placeholder: 'e.g. USD 34,800' },
    { name: 'validUntil', label: 'Valid until', required: true, type: 'date' },
    { name: 'terms', label: 'Delivery terms', type: 'textarea' },
  ],
  orders: [
    { name: 'product', label: 'Product / commodity', required: true },
    { name: 'party', label: 'Trading partner', required: true },
    { name: 'quantity', label: 'Quantity', required: true },
    { name: 'amount', label: 'Order total and currency', required: true },
    { name: 'delivery', label: 'Delivery destination', required: true },
  ],
  shipments: [
    { name: 'order', label: 'Order reference', required: true },
    { name: 'origin', label: 'Collection point', required: true },
    { name: 'destination', label: 'Destination', required: true },
    { name: 'provider', label: 'Logistics provider' },
    { name: 'eta', label: 'Estimated delivery date', type: 'date' },
  ],
  'transport-requests': [
    { name: 'order', label: 'Order reference', required: true },
    { name: 'cargo', label: 'Cargo description', required: true },
    { name: 'origin', label: 'Collection point', required: true },
    { name: 'destination', label: 'Destination', required: true },
    { name: 'charge', label: 'Transport quotation and currency', required: true },
  ],
  documents: [
    { name: 'name', label: 'Document name', required: true },
    { name: 'owner', label: 'Business / shipment reference', required: true },
    { name: 'type', label: 'Document type', required: true, type: 'select', options: ['Business registration', 'Tax clearance', 'Identity document', 'Cargo manifest', 'Customs document', 'Other'] },
    { name: 'expires', label: 'Expiry date', type: 'date' },
    { name: 'file', label: 'Select a file', type: 'file' },
  ],
  'proof-of-delivery': [
    { name: 'order', label: 'Order / shipment reference', required: true },
    { name: 'recipient', label: 'Received by', required: true },
    { name: 'deliveredAt', label: 'Delivery date', required: true, type: 'date' },
    { name: 'document', label: 'Proof-of-delivery file', type: 'file' },
    { name: 'notes', label: 'Delivery notes', type: 'textarea' },
  ],
  referrals: [
    { name: 'member', label: 'Referred business', required: true },
    { name: 'email', label: 'Contact email', type: 'email' },
    { name: 'registered', label: 'Registration date', type: 'date' },
  ],
  support: [
    { name: 'name', label: 'Subject', required: true },
    { name: 'owner', label: 'Account / order reference' },
    { name: 'priority', label: 'Priority', type: 'select', options: ['Normal', 'High', 'Urgent'] },
    { name: 'details', label: 'Describe the request', required: true, type: 'textarea' },
  ],
  profiles: [
    { name: 'name', label: 'Business name', required: true },
    { name: 'email', label: 'Business email', required: true, type: 'email' },
    { name: 'country', label: 'Country', required: true },
    { name: 'phone', label: 'Phone number' },
  ],
  settings: [
    { name: 'name', label: 'Preference', required: true },
    { name: 'value', label: 'Value', required: true },
    { name: 'scope', label: 'Applies to', required: true, type: 'select', options: ['This demo session', 'Account preference', 'Platform setting'] },
  ],
}

const initialStatus: Record<string, string> = {
  products: 'Pending approval', enquiries: 'Open', quotations: 'Draft', orders: 'Pending confirmation',
  shipments: 'Awaiting collection', invoices: 'Unpaid', documents: 'Pending review',
  'transport-requests': 'Open', 'proof-of-delivery': 'Pending confirmation', referrals: 'Invited', support: 'Open',
  members: 'Invited', profiles: 'Needs information', reports: 'Available', settings: 'Enabled', categories: 'Enabled',
}

function safeRole(value: string): DashboardRole {
  return isDashboardRole(value) ? value : 'Buyer'
}

function businessNameForRole(role: DashboardRole) {
  const businesses: Record<DashboardRole, string> = {
    Administrator: 'MASALA FOOD Platform Operations',
    Supplier: 'Chisomo Grain Cooperative',
    Buyer: 'Lakeview Produce Buyers',
    Marketing: 'MASALA FOOD Growth Partner',
    Logistics: 'Central Corridor Haulage',
  }
  return businesses[role]
}

function scopedRecordsForRole(role: DashboardRole, email: string, records: Record<string, DemoRecord[]>) {
  const business = businessNameForRole(role)
  const ordersForBuyer = (records.orders ?? []).filter((record) => record.party?.includes(business) || record.party?.includes(email))
  const ordersForSupplier = (records.orders ?? []).filter((record) => record.party?.includes(business))
  const shipmentsForProvider = (records.shipments ?? []).filter((record) => record.provider === business)
  const marketingReferrals = (records.referrals ?? []).filter((record) => record.marketer === business)
  const marketingCodes = new Set(marketingReferrals.map((record) => record.code).filter(Boolean))
  const marketingTransactions = (records.transactions ?? []).filter((record) => marketingCodes.has(record.referral ?? ''))
  const marketingTransactionRefs = new Set(marketingTransactions.flatMap((record) => [record.id, record.reference]))
  const storedProfile = (records.profiles ?? []).find((record) => record.role === role || record.email === email)
  const profile = [storedProfile ? { ...storedProfile, role, updated: storedProfile.updated ?? 'Today' } : {
    id: `profile-${role.toLowerCase()}`,
    reference: `profile-${role.toLowerCase()}`,
    name: business,
    email,
    role,
    country: 'Malawi',
    phone: '',
    status: 'Needs information',
    updated: 'Today',
  }]

  return Object.fromEntries(Object.entries(records).map(([key, rows]) => {
    let scoped = rows
    if (key === 'profiles') scoped = profile
    if (key === 'notifications') scoped = rows.filter((record) => !record.audience || record.audience === 'All' || record.audience === role)
    if (role === 'Supplier') {
      if (key === 'products') scoped = rows.filter((record) => record.supplier === business)
      if (key === 'enquiries') scoped = rows.filter((record) => record.supplier === business)
      if (key === 'quotations') scoped = rows.filter((record) => record.supplier === business)
      if (key === 'orders') scoped = ordersForSupplier
      if (key === 'invoices') scoped = rows.filter((record) => record.supplier === business || record.party === business)
      if (key === 'documents') scoped = rows.filter((record) => record.owner === business)
      if (key === 'support') scoped = rows.filter((record) => record.owner === business)
    }
    if (role === 'Buyer') {
      if (key === 'enquiries') scoped = rows.filter((record) => record.buyer === business || record.buyer === email)
      if (key === 'quotations') scoped = rows.filter((record) => record.buyer === business || record.buyer === email)
      if (key === 'orders') scoped = ordersForBuyer
      if (key === 'shipments') scoped = rows.filter((record) => ordersForBuyer.some((order) => order.reference === record.order))
      if (key === 'invoices') scoped = rows.filter((record) => record.buyer === business || record.party === business || record.party === email)
      if (key === 'saved-products') scoped = rows.filter((record) => record.buyer === business)
      if (key === 'documents') scoped = rows.filter((record) => record.owner === business)
      if (key === 'support') scoped = rows.filter((record) => record.owner === business)
    }
    if (role === 'Marketing') {
      if (key === 'referrals') scoped = marketingReferrals
      if (key === 'transactions') scoped = marketingTransactions
      if (key === 'commissions') scoped = rows.filter((record) => record.marketer === business || marketingTransactionRefs.has(record.transaction ?? ''))
    }
    if (role === 'Logistics') {
      if (key === 'shipments') scoped = shipmentsForProvider
      if (key === 'transport-requests') scoped = rows.filter((record) => record.status === 'Open' || record.provider === business)
      if (key === 'documents') scoped = rows.filter((record) => record.owner === business || shipmentsForProvider.some((shipment) => record.owner === shipment.reference))
      if (key === 'proof-of-delivery') scoped = rows.filter((record) => shipmentsForProvider.some((shipment) => shipment.order === record.order))
      if (key === 'support') scoped = rows.filter((record) => record.owner === business)
    }
    return [key, scoped]
  })) as Record<string, DemoRecord[]>
}

function newReference(key: string) {
  const prefix: Record<string, string> = { products: 'PRD', enquiries: 'ENQ', quotations: 'QUO', orders: 'ORD', shipments: 'SHP', invoices: 'INV', documents: 'DOC', referrals: 'REF', support: 'SUP', members: 'MEM', profiles: 'PRF', 'transport-requests': 'TRN', 'proof-of-delivery': 'POD', settings: 'SET' }
  return `${prefix[key] ?? 'DEMO'}-${String(Date.now()).slice(-5)}`
}

function statusAfter(action: DashboardAction, currentStatus: string) {
  switch (action) {
    case 'approve': return 'Approved'
    case 'reject': return 'Rejected'
    case 'suspend': return 'Suspended'
    case 'reactivate': return 'Verified'
    case 'submit': return 'Pending review'
    case 'send-quote': return 'Sent'
    case 'accept': return 'Accepted'
    case 'reject-quote': return 'Rejected'
    case 'confirm-order': return currentStatus === 'Pending confirmation' ? 'Confirmed' : 'Preparing'
    case 'cancel': return 'Cancellation requested'
    case 'assign-provider': return 'Logistics requested'
    case 'milestone':
      if (currentStatus === 'Awaiting collection') return 'Collected'
      if (currentStatus === 'Collected') return 'In transit'
      if (currentStatus === 'Delayed') return 'Delay reported'
      if (currentStatus === 'In transit') return 'Delivered (awaiting confirmation)'
      return 'In transit'
    case 'confirm-delivery': return 'Delivery confirmed'
    case 'report-issue': return 'Issue reported'
    case 'review-payment': return 'Pending verification'
    case 'verify-payment': return 'Verified'
    case 'reject-payment': return 'Rejected'
    case 'mark-read': return 'Read'
    case 'decline': return 'Declined'
    case 'record-pod': return 'Delivery submitted'
    default: return currentStatus
  }
}

function confirmationCopy(action: DashboardAction, record: DemoRecord, section: string) {
  if (action === 'accept' && section === 'transport-requests') return `Accept the assigned transport request “${record.name}” and link it to the order?`
  if (action === 'assign-provider') return `Assign “${record.name}” to Central Corridor Haulage, the logistics demo account?`
  const copy: Partial<Record<DashboardAction, string>> = {
    approve: `Approve “${record.name}” in this demo workspace?`,
    reject: `Reject “${record.name}” in this demo workspace?`,
    suspend: `Suspend access for “${record.name}” in this demo workspace?`,
    reactivate: `Reactivate “${record.name}” in this demo workspace?`,
    remove: `Remove “${record.name}” from this demo list?`,
    submit: `Submit “${record.name}” for review in this demo workspace?`,
    accept: `Accept “${record.name}”? A linked demo order will be created.`,
    'reject-quote': `Reject “${record.name}” in this demo workspace?`,
    'confirm-order': `Update fulfilment for “${record.name}”?`,
    cancel: `Request cancellation for “${record.name}”? The status will show a cancellation request, not a completed cancellation.`,
    'assign-provider': `Create a transport assignment request for “${record.name}”?`,
    milestone: `Advance the recorded milestone for “${record.name}”? This is not live GPS tracking.`,
    'confirm-delivery': `Confirm delivery for “${record.name}” in this demo workspace?`,
    'report-issue': `Record a delivery issue for “${record.name}”?`,
    'review-payment': `Move the submitted payment reference for “${record.name}” to pending verification? This will not mark it paid.`,
    'verify-payment': `Confirm that the payment reference for “${record.name}” was checked? This records verification only; it does not initiate settlement.`,
    'reject-payment': `Reject the submitted payment reference for “${record.name}”? The buyer can submit a new reference.`,
    decline: `Decline “${record.name}” in this demo workspace?`,
    'record-pod': `Record the delivery submission for “${record.name}”?`,
  }
  return copy[action] ?? `Continue with this action for “${record.name}”?`
}

function actionMessage(action: DashboardAction, section: string) {
  if (action === 'accept' && section === 'transport-requests') return 'Transport assignment accepted and shipment linked in this demo session.'
  if (action === 'assign-provider' && section === 'orders') return 'Transport request and shipment assignment were added to the shared demo workspace.'
  if (action === 'assign-provider' && section === 'transport-requests') return 'Transport provider assigned in the shared demo workspace.'
  const messages: Partial<Record<DashboardAction, string>> = {
    approve: 'Approved in the demo workspace.', reject: 'Marked rejected in the demo workspace.',
    suspend: 'Account marked suspended in the demo workspace.', reactivate: 'Account marked active in the demo workspace.',
    submit: 'Submitted for review in the demo workspace.', 'send-quote': 'Quotation marked sent in the demo workspace.',
    accept: 'Quotation accepted and a linked demo order was created.', 'reject-quote': 'Quotation marked rejected.',
    'confirm-order': 'Order fulfilment status updated.', cancel: 'Cancellation request recorded; no external party was contacted.',
    'assign-provider': 'Transport request added to the demo records.', milestone: 'Shipment milestone updated in the demo workspace.',
    'confirm-delivery': 'Delivery confirmation recorded in the demo workspace.', 'report-issue': 'A support issue was added to the demo records.',
    'review-payment': 'Payment reference moved to pending verification; it is not marked paid.',
    'verify-payment': 'Payment reference marked verified; settlement was not initiated.',
    'reject-payment': 'Payment reference rejected; the buyer can submit another reference.',
    'mark-read': 'Notification marked read.',
    decline: 'Assignment marked declined in the demo workspace.', 'record-pod': 'Delivery submission recorded; file storage is not connected.',
    remove: 'Record removed from the current demo session.',
  }
  return messages[action] ?? 'Demo record updated.'
}

function Overview({ role, email, onNavigate, metrics, onPrimary }: {
  role: DashboardRole
  email: string
  onNavigate: (section: string) => void
  metrics: ReturnType<typeof getOverviewMetrics>
  onPrimary: () => void
}) {
  const priorities: Record<DashboardRole, Array<{ title: string; detail: string; target: string }>> = {
    Administrator: [
      { title: 'Review member verification', detail: 'Check submitted business information.', target: 'members' },
      { title: 'Approve marketplace listings', detail: 'Keep unapproved products out of the public catalogue.', target: 'products' },
      { title: 'Monitor current orders', detail: 'Review fulfilment, delivery, and payment states.', target: 'orders' },
    ],
    Supplier: [
      { title: 'Maintain product listings', detail: 'Update price, category, and available stock.', target: 'products' },
      { title: 'Respond to buyer enquiries', detail: 'Review requested quantity and destination.', target: 'enquiries' },
      { title: 'Prepare quotations', detail: 'Set amount, currency, delivery terms, and validity.', target: 'quotations' },
    ],
    Buyer: [
      { title: 'Browse approved products', detail: 'Find a supplier and create a sourcing enquiry.', target: 'marketplace' },
      { title: 'Review quotations', detail: 'Compare commercial terms before accepting.', target: 'quotations' },
      { title: 'Track orders and invoices', detail: 'Check fulfilment and payment verification status.', target: 'orders' },
    ],
    Marketing: [
      { title: 'Share a referral link', detail: 'Copy a demo referral code for attribution.', target: 'referrals' },
      { title: 'Review transaction eligibility', detail: 'Check the underlying order and current status.', target: 'transactions' },
      { title: 'View commission history', detail: 'Amounts are samples and are not payment commitments.', target: 'commissions' },
    ],
    Logistics: [
      { title: 'Review transport requests', detail: 'Check cargo, collection, and delivery details.', target: 'transport-requests' },
      { title: 'Update a shipment milestone', detail: 'Record only milestones confirmed by your team.', target: 'shipments' },
      { title: 'Submit delivery details', detail: 'Record recipient and proof file metadata.', target: 'proof-of-delivery' },
    ],
  }
  return (
    <section className="app-dashboard-page-content" aria-labelledby="overview-title">
      <div className="app-dashboard-screen-heading app-dashboard-overview-heading">
        <div><p className="app-dashboard-kicker">Workspace / Overview</p><h2 id="overview-title">Your activity at a glance</h2><p className="app-dashboard-screen-description">A role-specific view of MASALA FOOD demo records for {email}.</p></div>
        <button type="button" className="app-dashboard-primary" onClick={onPrimary}><Plus size={17} />Quick action</button>
      </div>
      <div className="app-dashboard-demo-note"><CircleAlert size={15} /><span>Demo workspace: figures and actions use sample data held in this browser session. They are not connected to a production account or database.</span></div>
      <div className="app-dashboard-metric-grid">{metrics.map((metric) => <button type="button" key={metric.label} className="app-dashboard-metric" onClick={() => onNavigate(metric.target)}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}<ArrowRight size={13} /></small></button>)}</div>
      <div className="app-dashboard-overview-grid">
        <article className="app-dashboard-overview-card app-dashboard-priorities"><div className="app-dashboard-card-heading"><div><p className="app-dashboard-kicker">Your next steps</p><h3>Priority actions</h3></div><span className="app-dashboard-live"><i />Demo</span></div>{priorities[role].map((item, index) => <button type="button" className="app-dashboard-priority" key={item.title} onClick={() => onNavigate(item.target)}><span className="app-dashboard-priority-number">0{index + 1}</span><span><strong>{item.title}</strong><small>{item.detail}</small></span><ArrowRight size={16} /></button>)}</article>
        <article className="app-dashboard-overview-card"><div className="app-dashboard-card-heading"><div><p className="app-dashboard-kicker">Data scope</p><h3>Demo workspace</h3></div><ShieldCheck size={19} /></div><p className="app-dashboard-scope-copy">These screens demonstrate role-specific workflows. There is no real password verification, server-side authorization, secure file upload, payment processing, or database persistence configured.</p><div className="app-dashboard-scope-list"><span><Check size={14} />Role-specific navigation</span><span><Check size={14} />Validated demo forms</span><span><Check size={14} />Session-only workflow state</span></div><button type="button" className="app-dashboard-secondary" onClick={() => onNavigate('settings')}>Workspace settings <ArrowRight size={14} /></button></article>
      </div>
      <div className="app-dashboard-recent-card"><div className="app-dashboard-card-heading"><div><p className="app-dashboard-kicker">Recent records</p><h3>Latest marketplace activity</h3></div><button type="button" className="app-dashboard-link-button" onClick={() => onNavigate(role === 'Marketing' ? 'activity' : role === 'Logistics' ? 'shipments' : 'orders')}>Open activity <ArrowRight size={14} /></button></div><div className="app-dashboard-recent-list"><RecentItems role={role} onNavigate={onNavigate} /></div></div>
    </section>
  )
}

function RecentItems({ role, onNavigate }: { role: DashboardRole; onNavigate: (section: string) => void }) {
  const items: Record<DashboardRole, Array<{ label: string; detail: string; target: string }>> = {
    Administrator: [{ label: 'New member application', detail: 'Chisomo Grain Cooperative · Today', target: 'members' }, { label: 'Product awaiting approval', detail: 'White maize, grade 1 · Today', target: 'products' }, { label: 'Shipment in transit', detail: 'Soya beans to Kasumbalesa · Yesterday', target: 'shipments' }],
    Supplier: [{ label: 'New buyer enquiry', detail: '120 tonnes of white maize · Today', target: 'enquiries' }, { label: 'Listing awaiting review', detail: 'White maize, grade 1 · Today', target: 'products' }, { label: 'Order fulfilment update', detail: 'ORD-299 · Yesterday', target: 'orders' }],
    Buyer: [{ label: 'Quotation ready to review', detail: 'QUO-081 · Today', target: 'quotations' }, { label: 'Shipment status update', detail: 'SHP-087 · Yesterday', target: 'shipments' }, { label: 'Invoice reference submitted', detail: 'INV-224 · Yesterday', target: 'invoices' }],
    Marketing: [{ label: 'Referral registered', detail: 'Copperbelt Foods · Yesterday', target: 'referrals' }, { label: 'Trade eligible for review', detail: 'TXN-120 · Today', target: 'transactions' }, { label: 'Commission awaiting review', detail: 'COM-048 · Today', target: 'commissions' }],
    Logistics: [{ label: 'Transport request available', detail: '120 tonnes to Lubumbashi · Today', target: 'transport-requests' }, { label: 'Shipment milestone', detail: 'SHP-087 · Yesterday', target: 'shipments' }, { label: 'Delivery record awaiting proof', detail: 'ORD-281 · Today', target: 'proof-of-delivery' }],
  }
  return <>{items[role].map((item) => <button type="button" key={item.label} className="app-dashboard-recent-item" onClick={() => onNavigate(item.target)}><span><strong>{item.label}</strong><small>{item.detail}</small></span><ArrowRight size={15} /></button>)}</>
}

function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    closeButtonRef.current?.focus()
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <div className="app-dashboard-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className={`app-dashboard-modal ${wide ? 'is-wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header><h2 id="dialog-title">{title}</h2><button ref={closeButtonRef} type="button" className="app-dashboard-icon-button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button></header>{children}</section></div>
}

export function DashboardApp({ roleValue, email, initialView }: { roleValue: string; email: string; initialView: string }) {
  const role = safeRole(roleValue)
  const router = useRouter()
  const { records, addRecord, updateRecord, removeRecord } = useDashboardStore()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [overlay, setOverlay] = useState<Overlay | null>(null)
  const [toast, setToast] = useState('')
  const navItems = DASHBOARD_NAVIGATION[role]
  const activeView = navItems.some((item) => item.key === initialView) ? initialView : 'overview'
  const currentScreen = activeView === 'overview' ? null : getDashboardScreen(role, activeView)
  const accountBusiness = businessNameForRole(role)
  const accountRecords = scopedRecordsForRole(role, email, records)
  const notifications = accountRecords.notifications ?? []
  const unread = notifications.filter((entry) => entry.status === 'Unread').length
  const metrics = getOverviewMetrics(role, accountRecords)

  const routeFor = (section: string) => {
    const path = section === 'overview' ? '/dashboard' : `/dashboard/${section}`
    return `${path}?role=${encodeURIComponent(role)}&email=${encodeURIComponent(email)}`
  }
  const navigate = (section: string) => {
    router.push(routeFor(section))
    setMobileNavOpen(false)
  }
  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }

  const openForm = (section: string, targetKey: string, record?: DemoRecord, special?: 'payment' | 'transport-quote' | 'respond', initialValues?: Partial<DemoRecord>) => {
    let fields = sharedFields[targetKey] ?? sharedFields[section] ?? [
      { name: 'name', label: 'Name', required: true },
      { name: 'details', label: 'Details', type: 'textarea' as const },
    ]
    if (targetKey === 'products') {
      const categories = Array.from(new Set([...(records.categories ?? []).map((item) => item.name), ...(fields.find((field) => field.name === 'category')?.options ?? [])]))
      fields = fields.map((field) => field.name === 'category' ? { ...field, options: categories } : field)
    }
    let title = record ? `Edit ${record.name}` : `Create ${getDashboardScreen(role, section)?.title.toLowerCase() ?? 'record'}`
    if (!record && targetKey === 'products') title = 'Add product listing'
    if (!record && targetKey === 'categories') title = 'Add product category'
    if (!record && targetKey === 'members') title = 'Invite demo member'
    if (!record && targetKey === 'enquiries') title = 'Create buyer enquiry'
    if (!record && targetKey === 'quotations') title = 'Create supplier quotation'
    if (special === 'transport-quote') {
      fields = [
        { name: 'charge', label: 'Transport quotation and currency', required: true, placeholder: 'e.g. USD 2,400' },
        { name: 'quoteTerms', label: 'Transit time and delivery terms', type: 'textarea' },
      ]
      title = `Submit transport quotation for ${record?.reference ?? 'request'}`
    } else if (special === 'payment') {
      fields = [
        { name: 'paymentReference', label: 'Payment reference', required: true },
        { name: 'paymentChannel', label: 'Payment method / channel', required: true, type: 'select', options: ['Bank transfer', 'Mobile money', 'Other supported method'] },
      ]
      title = `Submit reference for ${record?.reference ?? 'invoice'}`
    } else if (special === 'respond') {
      fields = [{ name: 'response', label: 'Response to buyer', required: true, type: 'textarea' }]
      title = `Respond to ${record?.reference ?? 'enquiry'}`
    } else if (section === 'support') title = record ? 'Update support request' : 'New support request'
    else if (section === 'profile') title = 'Edit business profile'
    else if (section === 'settings') title = record ? 'Edit preference' : 'Add preference'
    else if (section === 'documents') title = record ? 'Update document details' : 'Submit document details'
    else if (section === 'proof-of-delivery') title = 'Record delivery details'
    else if (role === 'Marketing' && section === 'referrals' && !record) title = 'Generate a referral link'
    setOverlay({ kind: 'form', title, targetKey, section, record, initialValues, fields, special })
  }

  const handlePrimary = () => {
    if (!currentScreen || activeView === 'overview') {
      const defaultTarget: Record<DashboardRole, string> = { Administrator: 'members', Supplier: 'products', Buyer: 'marketplace', Marketing: 'referrals', Logistics: 'shipments' }
      const target = defaultTarget[role]
      if (target === 'marketplace') navigate(target)
      else if (target === 'shipments' && role === 'Logistics') navigate(target)
      else openForm(target, getDashboardScreen(role, target)?.dataKey ?? target)
      return
    }
    if (currentScreen.primaryAction?.toLowerCase().includes('export')) {
      exportRows(currentScreen.title, currentScreen.columns, accountRecords[currentScreen.dataKey] ?? [])
      return
    }
    if (activeView === 'notifications') {
      notifications.filter((item) => item.status === 'Unread').forEach((item) => updateRecord('notifications', item.id, { status: 'Read', updated: 'Just now' }))
      showToast('Your notifications were marked read in this demo session.')
      return
    }
    if (activeView === 'saved-products' && currentScreen.primaryAction === 'Browse marketplace') {
      navigate('marketplace')
      return
    }
    if (activeView === 'profile') {
      const profile = records.profiles?.find((record) => record.role === role || record.email === email)
      if (profile) openForm('profile', 'profiles', profile)
      else openForm('profile', 'profiles', undefined, undefined, { name: accountBusiness, email, country: 'Malawi', phone: '', role, status: 'Needs information' })
      return
    }
    if (activeView === 'inventory') {
      const product = records.products?.[0]
      openForm('inventory', 'products', product)
      return
    }
    if (activeView === 'invoices' && role === 'Buyer') {
      const invoice = (records.invoices ?? []).find((item) => item.status === 'Unpaid' || item.status === 'Rejected')
      if (invoice) openForm('invoices', 'invoices', invoice, 'payment')
      else showToast('There are no invoices awaiting a payment reference in this demo list.')
      return
    }
    if (role === 'Buyer' && activeView === 'marketplace') {
      const selectedProduct = (records.products ?? []).find((item) => item.status === 'Approved')
      openForm('marketplace', 'enquiries', undefined, undefined, { ...(selectedProduct ? { product: selectedProduct.name, supplier: selectedProduct.supplier } : {}), buyer: accountBusiness })
      return
    }
    const target = getPrimaryTarget(role, activeView, currentScreen.dataKey)
    openForm(target, target)
  }

  const openAction = (action: DashboardAction, row: DemoRecord) => {
    const screen = currentScreen
    const sourceKey = screen?.dataKey ?? activeView
    if (action === 'view') {
      if (activeView === 'notifications' && row.target) { navigate(row.target); return }
      setOverlay({ kind: 'detail', record: row });
      return
    }
    if (action === 'edit') { openForm(activeView, sourceKey, row); return }
    if (action === 'submit-reference') { openForm('invoices', 'invoices', row, 'payment'); return }
    if (action === 'record-pod') {
      const isShipment = activeView === 'shipments'
      openForm('proof-of-delivery', 'proof-of-delivery', isShipment ? undefined : row, undefined, isShipment ? { order: row.order ?? row.reference, recipient: '', deliveredAt: '' } : undefined)
      return
    }
    if (action === 'submit-transport-quote') { openForm('transport-requests', 'transport-requests', row, 'transport-quote'); return }
    if (action === 'copy-link') {
      const link = `https://masala.food/join?ref=${encodeURIComponent(row.code ?? row.reference ?? row.id)}`
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(link).then(() => showToast('Demo referral link copied.')).catch(() => showToast(link))
      else showToast(link)
      return
    }
    if (action === 'save') {
      const saved = records['saved-products'] ?? []
      if (saved.some((item) => item.reference === row.id || item.name === row.name)) { showToast('This item is already in your saved products.'); return }
      addRecord('saved-products', { ...row, id: newReference('saved-products'), reference: row.id, buyer: accountBusiness, status: row.status === 'Approved' ? 'Available' : row.status, updated: 'Just now' })
      showToast('Product saved in this demo session.')
      return
    }
    if (action === 'enquire') {
      openForm('enquiries', 'enquiries', undefined, undefined, { product: row.name, buyer: accountBusiness, supplier: row.supplier ?? 'Listed supplier' })
      return
    }
    if (action === 'respond') {
      openForm('enquiries', sourceKey, row, 'respond')
      return
    }
    if (action === 'create-quote') { openForm('quotations', 'quotations', undefined, undefined, { product: row.product, buyer: row.buyer, quantity: row.quantity }); return }
    if (action === 'mark-read') {
      updateRecord(sourceKey, row.id, { status: 'Read', updated: 'Just now' })
      showToast('Notification marked read.')
      return
    }
    if (action === 'remove' || action === 'approve' || action === 'reject' || action === 'suspend' || action === 'reactivate' || action === 'submit' || action === 'send-quote' || action === 'accept' || action === 'reject-quote' || action === 'confirm-order' || action === 'cancel' || action === 'assign-provider' || action === 'milestone' || action === 'confirm-delivery' || action === 'report-issue' || action === 'review-payment' || action === 'verify-payment' || action === 'reject-payment' || action === 'decline') {
      setOverlay({ kind: 'confirm', action, record: row, sourceKey, section: activeView })
      return
    }
    showToast('This action is not available for this record.')
  }

  const handleConfirm = () => {
    if (overlay?.kind !== 'confirm') return
    const { action, record, sourceKey, section } = overlay
    if (action === 'remove') {
      removeRecord(sourceKey, record.id)
      setOverlay(null)
      showToast(actionMessage(action, section))
      return
    }

    let nextStatus = statusAfter(action, record.status)
    if (action === 'approve' && sourceKey === 'members') nextStatus = 'Verified'
    if (action === 'submit' && sourceKey === 'products') nextStatus = 'Pending approval'
    if (action === 'assign-provider' && sourceKey === 'transport-requests') nextStatus = 'Assigned'
    if (action === 'assign-provider' && sourceKey === 'shipments') nextStatus = 'Awaiting collection'
    if (action === 'assign-provider' && sourceKey === 'orders') nextStatus = 'Logistics requested'

    const provider = 'Central Corridor Haulage'
    const recordPatch: Partial<DemoRecord> = { status: nextStatus, updated: 'Just now' }
    if (action === 'assign-provider') recordPatch.provider = provider
    updateRecord(sourceKey, record.id, recordPatch)

    if (sourceKey === 'invoices' && (action === 'review-payment' || action === 'verify-payment' || action === 'reject-payment')) {
      const paymentState = action === 'review-payment' ? 'moved to pending verification' : action === 'verify-payment' ? 'verified' : 'rejected'
      const noticeId = newReference('notifications')
      addRecord('notifications', {
        id: noticeId,
        reference: noticeId,
        name: action === 'verify-payment' ? 'Payment reference verified' : action === 'reject-payment' ? 'Payment reference rejected' : 'Payment reference under review',
        detail: `The payment reference for ${record.reference ?? record.name} was ${paymentState}.`,
        audience: 'Buyer',
        target: 'invoices',
        status: 'Unread',
        updated: 'Just now',
      })
    }

    if ((action === 'approve' || action === 'reject') && sourceKey === 'products') {
      const savedProducts = records['saved-products'] ?? []
      savedProducts.filter((item) => item.reference === record.id || item.reference === record.reference).forEach((item) => updateRecord('saved-products', item.id, { status: action === 'approve' ? 'Available' : 'Unavailable', updated: 'Just now' }))
      const noticeId = newReference('notifications')
      addRecord('notifications', { id: noticeId, reference: noticeId, name: 'Product review update', detail: `${record.name} was ${action === 'approve' ? 'approved' : 'rejected'} by the marketplace review team.`, audience: 'Supplier', target: 'products', status: 'Unread', updated: 'Just now' })
    }

    if (action === 'accept' && section === 'quotations') {
      const orderReference = newReference('orders')
      const buyer = record.buyer ?? accountBusiness
      const supplier = record.supplier ?? 'Supplier'
      addRecord('orders', {
        id: orderReference,
        reference: orderReference,
        quotation: record.reference ?? record.id,
        name: `Order from ${record.reference ?? record.name}`,
        product: record.product ?? record.name,
        buyer,
        supplier,
        party: `${buyer} ↔ ${supplier}`,
        quantity: record.quantity ?? 'Confirm quantity',
        amount: record.amount ?? 'Confirm total',
        delivery: record.delivery ?? 'To be arranged',
        status: 'Pending confirmation',
        updated: 'Just now',
      })
      const noticeId = newReference('notifications')
      addRecord('notifications', { id: noticeId, reference: noticeId, name: 'Quotation accepted', detail: `${record.reference ?? record.name} was accepted and created order ${orderReference}.`, audience: 'Supplier', target: 'orders', status: 'Unread', updated: 'Just now' })
    }

    if (action === 'assign-provider' && sourceKey === 'orders') {
      const orderReference = record.reference ?? record.id
      const existingRequest = (records['transport-requests'] ?? []).find((item) => item.order === orderReference)
      if (existingRequest) updateRecord('transport-requests', existingRequest.id, { provider, status: 'Assigned', updated: 'Just now' })
      else {
        const requestReference = newReference('transport-requests')
        addRecord('transport-requests', { id: requestReference, reference: requestReference, name: `${orderReference} · ${record.product ?? 'Cargo'}`, order: orderReference, cargo: `${record.quantity ?? 'Quantity to confirm'} · ${record.product ?? 'Cargo'}`, origin: 'Collection location to confirm', destination: record.delivery ?? 'Destination to confirm', charge: 'Quote required', provider, status: 'Assigned', updated: 'Just now' })
      }
      const shipment = (records.shipments ?? []).find((item) => item.order === orderReference)
      if (shipment) updateRecord('shipments', shipment.id, { provider, status: 'Awaiting collection', updated: 'Just now' })
      else {
        const shipmentReference = newReference('shipments')
        addRecord('shipments', { id: shipmentReference, reference: shipmentReference, name: `${record.product ?? 'Order'} shipment`, order: orderReference, origin: 'Collection location to confirm', destination: record.delivery ?? 'Destination to confirm', provider, eta: 'To be confirmed', status: 'Awaiting collection', updated: 'Just now' })
      }
      const noticeId = newReference('notifications')
      addRecord('notifications', { id: noticeId, reference: noticeId, name: 'Logistics assignment', detail: `${orderReference} is assigned to ${provider}.`, audience: 'Logistics', target: 'transport-requests', status: 'Unread', updated: 'Just now' })
    }

    if (action === 'accept' && section === 'transport-requests') {
      const orderReference = record.order ?? record.reference ?? record.id
      const shipment = (records.shipments ?? []).find((item) => item.order === orderReference)
      if (shipment) updateRecord('shipments', shipment.id, { provider: accountBusiness, status: 'Awaiting collection', updated: 'Just now' })
      else {
        const shipmentReference = newReference('shipments')
        addRecord('shipments', { id: shipmentReference, reference: shipmentReference, name: `${record.cargo ?? record.name} shipment`, order: orderReference, origin: record.origin ?? 'Collection location to confirm', destination: record.destination ?? 'Destination to confirm', provider: accountBusiness, eta: 'To be confirmed', status: 'Awaiting collection', updated: 'Just now' })
      }
      const order = (records.orders ?? []).find((item) => item.reference === orderReference)
      if (order) updateRecord('orders', order.id, { provider: accountBusiness, status: 'Logistics assigned', updated: 'Just now' })
      const noticeId = newReference('notifications')
      addRecord('notifications', { id: noticeId, reference: noticeId, name: 'Carrier accepted assignment', detail: `${orderReference} is now assigned to ${accountBusiness}.`, audience: 'Buyer', target: 'shipments', status: 'Unread', updated: 'Just now' })
    }

    if (action === 'send-quote') {
      const noticeId = newReference('notifications')
      addRecord('notifications', { id: noticeId, reference: noticeId, name: 'Supplier quotation sent', detail: `${record.reference ?? record.name} is ready for buyer review.`, audience: 'Buyer', target: 'quotations', status: 'Unread', updated: 'Just now' })
    }

    if (action === 'report-issue') {
      const supportReference = newReference('support')
      addRecord('support', { id: supportReference, reference: supportReference, name: `Delivery issue: ${record.name}`, owner: accountBusiness, related: record.reference ?? record.id, priority: 'High', status: 'Open', updated: 'Just now' })
    }

    if (action === 'confirm-delivery') {
      const orderReference = record.order ?? record.reference ?? record.id
      const shipment = (records.shipments ?? []).find((item) => item.order === orderReference || item.reference === record.reference)
      if (shipment) updateRecord('shipments', shipment.id, { status: 'Delivery confirmed', updated: 'Just now' })
      const order = (records.orders ?? []).find((item) => item.reference === orderReference)
      if (order) updateRecord('orders', order.id, { status: 'Complete', updated: 'Just now' })
      const deliveryRecord = (records['proof-of-delivery'] ?? []).find((item) => item.order === orderReference)
      if (deliveryRecord) updateRecord('proof-of-delivery', deliveryRecord.id, { status: 'Delivered', updated: 'Just now' })
    }

    setOverlay(null)
    showToast(actionMessage(action, section))
  }

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (overlay?.kind !== 'form') return
    const formData = new FormData(event.currentTarget)
    const values: Record<string, string> = {}
    overlay.fields.forEach((field) => {
      const value = formData.get(field.name)
      if (field.type === 'file') values[field.name] = value instanceof File && value.name ? value.name : ''
      else values[field.name] = String(value ?? '').trim()
    })
    if (overlay.special === 'transport-quote' && overlay.record) {
      updateRecord(overlay.targetKey, overlay.record.id, { charge: values.charge, quoteTerms: values.quoteTerms, provider: accountBusiness, status: 'Quoted', updated: 'Just now' })
      setOverlay(null)
      showToast('Transport quotation submitted in this demo session; no provider was contacted.')
      return
    }
    if (overlay.special === 'payment' && overlay.record) {
      updateRecord(overlay.targetKey, overlay.record.id, { paymentReference: values.paymentReference, paymentChannel: values.paymentChannel, status: 'Reference submitted', updated: 'Just now' })
      const noticeId = newReference('notifications')
      addRecord('notifications', {
        id: noticeId,
        reference: noticeId,
        name: 'Payment reference submitted',
        detail: `${overlay.record.reference ?? overlay.record.name} has a new reference awaiting finance review.`,
        audience: 'Administrator',
        target: 'invoices',
        status: 'Unread',
        updated: 'Just now',
      })
      setOverlay(null)
      showToast('Reference submitted for verification. The invoice is not marked paid.')
      return
    }
    if (overlay.special === 'respond' && overlay.record) {
      updateRecord(overlay.targetKey, overlay.record.id, { response: values.response, status: 'Response sent', updated: 'Just now' })
      setOverlay(null)
      showToast('Response saved in this demo session.')
      return
    }
    if (values.file || values.image) values.fileNotice = 'File name saved in demo only; the file was not uploaded.'
    const fallbackName = values.product || values.member || values.order || values.reference || values.value || 'New record'
    const name = values.name || fallbackName
    const reference = overlay.record?.reference || newReference(overlay.targetKey)
    const next: DemoRecord = {
      ...(overlay.record ?? {}),
      ...values,
      id: overlay.record?.id ?? reference,
      reference,
      name,
      status: overlay.record?.status ?? initialStatus[overlay.targetKey] ?? 'Open',
      updated: 'Just now',
    }
    if (overlay.targetKey === 'referrals' && !next.code) next.code = `MASALA-DEMO-${String(Date.now()).slice(-5)}`
    if (overlay.targetKey === 'products' && role === 'Supplier') { next.status = 'Pending approval'; next.supplier = accountBusiness }
    if (overlay.targetKey === 'enquiries' && role === 'Buyer') { next.buyer = accountBusiness; next.supplier = overlay.initialValues?.supplier ?? next.supplier }
    if (overlay.targetKey === 'quotations' && role === 'Supplier') { next.status = 'Draft'; next.supplier = accountBusiness }
    if (overlay.targetKey === 'referrals' && role === 'Marketing') next.marketer = accountBusiness
    if (overlay.targetKey === 'documents' && (role === 'Supplier' || role === 'Buyer' || role === 'Logistics')) { next.owner = accountBusiness; next.status = 'Pending review' }
    if (overlay.targetKey === 'support' && (role === 'Supplier' || role === 'Buyer' || role === 'Logistics')) next.owner = accountBusiness
    if (overlay.targetKey === 'profiles') next.role = role
    if (overlay.targetKey === 'proof-of-delivery' && role === 'Logistics' && values.deliveredAt) next.status = 'Delivery submitted'
    const existingRecord = overlay.record && (records[overlay.targetKey] ?? []).some((record) => record.id === overlay.record?.id)
    if (overlay.record && existingRecord) updateRecord(overlay.targetKey, overlay.record.id, next)
    else addRecord(overlay.targetKey, next)
    if (overlay.targetKey === 'proof-of-delivery' && role === 'Logistics' && values.deliveredAt) {
      const shipment = (records.shipments ?? []).find((item) => item.order === values.order)
      if (shipment) updateRecord('shipments', shipment.id, { status: 'Delivered (awaiting confirmation)', updated: 'Just now' })
    }
    const target = overlay.targetKey
    setOverlay(null)
    showToast(`${getDashboardScreen(role, overlay.section)?.title ?? 'Record'} saved in this demo session.`)
    if (target !== getDashboardScreen(role, activeView)?.dataKey && overlay.section === 'marketplace') navigate('enquiries')
  }

  const exportRows = (title: string, cols: Array<{ key: string; label: string }>, rows: DemoRecord[]) => {
    if (!rows.length) { showToast('There are no records to export.'); return }
    const escapeCell = (value: string) => `"${value.replaceAll('"', '""')}"`
    const csv = [cols.map((column) => escapeCell(column.label)).join(','), ...rows.map((row) => cols.map((column) => escapeCell(String(row[column.key] ?? ''))).join(','))].join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-demo.csv`
    link.click()
    URL.revokeObjectURL(url)
    showToast('CSV exported from the current demo records.')
  }

  const handleLogout = () => {
    document.cookie = 'masala_session=; Max-Age=0; path=/; SameSite=Lax'
    document.cookie = 'masala_role=; Max-Age=0; path=/; SameSite=Lax'
    document.cookie = 'masala_email=; Max-Age=0; path=/; SameSite=Lax'
    router.push('/')
  }

  const currentNav = navItems.find((item) => item.key === activeView)
  const CurrentIcon = iconMap[currentNav?.icon ?? 'overview'] ?? LayoutDashboard
  const displayName = accountRecords.profiles?.[0]?.name ?? accountBusiness
  const unreadPanel = accountRecords.notifications?.slice(0, 3) ?? []

  return (
    <div className="app-dashboard-shell">
      {mobileNavOpen && <button type="button" className="app-dashboard-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`app-dashboard-sidebar ${mobileNavOpen ? 'is-open' : ''}`}>
        <Link href="/" className="app-dashboard-brand" aria-label="MASALA FOOD home"><span>MF</span><strong>MASALA<br />FOOD</strong></Link>
        <div className="app-dashboard-workspace-label"><i />{role} workspace</div>
        <nav className="app-dashboard-nav" aria-label={`${role} dashboard navigation`}>
          {navItems.map(({ key, label, icon }) => { const Icon = iconMap[icon] ?? LayoutDashboard; return <Link key={key} href={routeFor(key)} className={`app-dashboard-nav-link ${activeView === key ? 'is-active' : ''}`} aria-current={activeView === key ? 'page' : undefined} onClick={() => setMobileNavOpen(false)}><Icon size={17} /><span>{label}</span>{key === 'notifications' && unread > 0 && <b className="app-dashboard-nav-count">{unread}</b>}</Link> })}
        </nav>
        <div className="app-dashboard-sidebar-footer"><span className="app-dashboard-demo-chip"><i />Demo mode</span><button type="button" className="app-dashboard-logout" onClick={handleLogout}><LogOut size={16} /><span>Sign out</span></button></div>
      </aside>

      <div className="app-dashboard-main">
        <header className="app-dashboard-topbar">
          <button type="button" className="app-dashboard-mobile-toggle" onClick={() => setMobileNavOpen(true)} aria-label="Open dashboard navigation"><Menu size={20} /></button>
          <div className="app-dashboard-crumb"><CurrentIcon size={16} /><span>{currentNav?.label ?? 'Overview'}</span><span className="app-dashboard-crumb-role">· {role}</span></div>
          <div className="app-dashboard-top-actions">
            <div className="app-dashboard-popover-wrap">
              <button type="button" className={`app-dashboard-icon-button ${notificationsOpen ? 'is-open' : ''}`} aria-label={`Notifications, ${unread} unread`} aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((open) => !open); setAccountOpen(false) }}><Bell size={18} />{unread > 0 && <i className="app-dashboard-notification-dot" />}</button>
              {notificationsOpen && <div className="app-dashboard-popover app-dashboard-notification-popover"><div className="app-dashboard-popover-heading"><strong>Notifications</strong><button type="button" onClick={() => { notifications.filter((item) => item.status === 'Unread').forEach((item) => updateRecord('notifications', item.id, { status: 'Read', updated: 'Just now' })); showToast('Your notifications were marked read.') }}>Mark all read</button></div>{unreadPanel.map((item) => <button type="button" key={item.id} className="app-dashboard-popover-item" onClick={() => { navigate('notifications'); setNotificationsOpen(false) }}><span className={item.status === 'Unread' ? 'is-unread' : ''} /><span><strong>{item.name}</strong><small>{item.detail}</small></span></button>)}{unreadPanel.length === 0 && <p className="app-dashboard-popover-empty">You are all caught up.</p>}<button type="button" className="app-dashboard-popover-footer" onClick={() => { navigate('notifications'); setNotificationsOpen(false) }}>View notifications <ArrowRight size={13} /></button></div>}
            </div>
            <div className="app-dashboard-popover-wrap">
              <button type="button" className="app-dashboard-account-trigger" aria-expanded={accountOpen} onClick={() => { setAccountOpen((open) => !open); setNotificationsOpen(false) }}><span className="app-dashboard-avatar">{role.slice(0, 1)}</span><span className="app-dashboard-account-copy"><strong>{displayName}</strong><small>{email}</small></span><ChevronDown size={15} /></button>
              {accountOpen && <div className="app-dashboard-popover app-dashboard-account-popover"><button type="button" onClick={() => { navigate(role === 'Administrator' ? 'settings' : 'profile'); setAccountOpen(false) }}><BriefcaseBusiness size={15} />{role === 'Administrator' ? 'Account settings' : 'Business profile'}</button><button type="button" onClick={() => { navigate('settings'); setAccountOpen(false) }}><Settings size={15} />Settings</button><button type="button" className="is-logout" onClick={handleLogout}><LogOut size={15} />Sign out</button></div>}
            </div>
          </div>
        </header>

        <main className="app-dashboard-content">
          <div className="app-dashboard-greeting"><div><span className="app-dashboard-status-dot"><i /> Demo account · {role}</span><p className="app-dashboard-greeting-title">Welcome back, <strong>{displayName}</strong></p><p className="app-dashboard-greeting-email">{email}</p></div><div className="app-dashboard-date"><span>MASALA FOOD</span><strong>Trade workspace</strong></div></div>
          {activeView === 'overview' ? <Overview role={role} email={email} onNavigate={navigate} metrics={metrics} onPrimary={handlePrimary} /> : currentScreen ? <DashboardRecordScreen role={role} section={activeView} screen={currentScreen} rows={(accountRecords[currentScreen.dataKey] ?? []).filter((row) => role !== 'Buyer' || activeView !== 'marketplace' || row.status === 'Approved')} onPrimary={handlePrimary} onAction={openAction} onMarkAllRead={() => { notifications.filter((item) => item.status === 'Unread').forEach((item) => updateRecord('notifications', item.id, { status: 'Read', updated: 'Just now' })); showToast('Your notifications were marked read in this demo session.') }} onExport={(rows) => exportRows(currentScreen.title, currentScreen.columns, rows)} /> : <section className="app-dashboard-page-content"><div className="app-dashboard-empty"><strong>Screen not found</strong><p>This dashboard section is not available for this role.</p><button type="button" className="app-dashboard-secondary" onClick={() => navigate('overview')}>Return to overview <ArrowRight size={14} /></button></div></section>}
          <footer className="app-dashboard-footer"><span>MASALA FOOD · role workspace</span><span>Demo records stay in this tab&apos;s session; they are not saved to a server.</span></footer>
        </main>
      </div>

      {toast && <div className="app-dashboard-toast" role="status"><Check size={16} />{toast}</div>}

      {overlay?.kind === 'detail' && <Modal title={overlay.record.name} onClose={() => setOverlay(null)}><div className="app-dashboard-detail-body"><span className={`app-dashboard-status ${overlay.record.status.toLowerCase().includes('approved') || overlay.record.status.toLowerCase().includes('verified') ? 'is-positive' : 'is-warning'}`}>{overlay.record.status}</span><dl>{Object.entries(overlay.record).filter(([key, value]) => key !== 'id' && value !== undefined && value !== '').map(([key, value]) => <div key={key}><dt>{key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`).replace(/^./, (letter) => letter.toUpperCase())}</dt><dd>{value}</dd></div>)}</dl><div className="app-dashboard-modal-note"><CircleAlert size={14} />Details are demo records and may not represent verified business data.</div></div><footer className="app-dashboard-modal-footer"><button type="button" className="app-dashboard-secondary" onClick={() => setOverlay(null)}>Close</button></footer></Modal>}

      {overlay?.kind === 'form' && <Modal title={overlay.title} onClose={() => setOverlay(null)}><form className="app-dashboard-form" onSubmit={saveForm}>
        {overlay.record && <div className="app-dashboard-form-record">Updating <strong>{overlay.record.reference ?? overlay.record.name}</strong></div>}
        {overlay.fields.map((field) => (
          <label className={`app-dashboard-field ${field.type === 'textarea' ? 'is-full' : ''}`} key={field.name}>
            <span>{field.label}{field.required && <b> *</b>}</span>
            {field.type === 'textarea' ? <textarea name={field.name} defaultValue={overlay.record?.[field.name] ?? overlay.initialValues?.[field.name] ?? (field.name === 'product' && overlay.record ? overlay.record.name : '')} required={field.required} rows={3} placeholder={field.placeholder} /> : field.type === 'select' ? <select name={field.name} defaultValue={overlay.record?.[field.name] ?? overlay.initialValues?.[field.name] ?? field.options?.[0] ?? ''} required={field.required}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type ?? 'text'} defaultValue={field.type === 'file' ? undefined : overlay.record?.[field.name] ?? overlay.initialValues?.[field.name] ?? (field.name === 'product' && overlay.record ? overlay.record.name : '')} accept={field.type === 'file' ? field.name === 'image' ? 'image/*' : '.pdf,.jpg,.jpeg,.png' : undefined} required={field.required} min={field.type === 'number' ? '0' : undefined} step={field.type === 'number' ? 'any' : undefined} placeholder={field.placeholder} />}
            {field.type === 'file' && overlay.record?.[field.name] && <small>Current demo filename: {overlay.record[field.name]}</small>}
          </label>
        ))}
        {(overlay.fields.some((field) => field.type === 'file') || overlay.special === 'payment' || overlay.special === 'transport-quote') && <p className="app-dashboard-form-warning"><CircleAlert size={14} />{overlay.special === 'payment' ? 'This only records a reference for review. It does not confirm payment.' : overlay.special === 'transport-quote' ? 'This demo quote is not sent to an external buyer or carrier.' : 'Only the file name is saved in this demo; the file itself is not uploaded.'}</p>}
        <footer className="app-dashboard-modal-footer"><button type="button" className="app-dashboard-secondary" onClick={() => setOverlay(null)}>Cancel</button><button type="submit" className="app-dashboard-primary"><Check size={15} />{overlay.special === 'payment' ? 'Submit for verification' : overlay.record ? 'Save changes' : 'Save demo record'}</button></footer>
      </form></Modal>}

      {overlay?.kind === 'confirm' && <Modal title="Confirm action" onClose={() => setOverlay(null)}><div className="app-dashboard-confirm-body"><span className="app-dashboard-confirm-icon"><CircleAlert size={20} /></span><p>{confirmationCopy(overlay.action, overlay.record, overlay.section)}</p><small>This only updates the current demo session. No external party or production record is changed.</small></div><footer className="app-dashboard-modal-footer"><button type="button" className="app-dashboard-secondary" onClick={() => setOverlay(null)}>Go back</button><button type="button" className={overlay.action === 'reject' || overlay.action === 'reject-payment' || overlay.action === 'remove' || overlay.action === 'cancel' || overlay.action === 'decline' ? 'app-dashboard-danger' : 'app-dashboard-primary'} onClick={handleConfirm}><Check size={15} />Confirm</button></footer></Modal>}
    </div>
  )
}


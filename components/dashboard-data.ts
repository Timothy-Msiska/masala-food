export type DashboardRole = 'Administrator' | 'Supplier' | 'Buyer' | 'Marketing' | 'Logistics'

export type DemoRecord = {
  id: string
  name: string
  status: string
  updated?: string
  [key: string]: string | undefined
}

export type DashboardColumn = { key: string; label: string }
export type DashboardScreen = {
  title: string
  description: string
  dataKey: string
  columns: DashboardColumn[]
  primaryAction?: string
  filters?: string[]
  demoNote?: string
}

export type DashboardNavigationItem = { key: string; label: string; icon: string }

export const DASHBOARD_ROLES: DashboardRole[] = ['Administrator', 'Supplier', 'Buyer', 'Marketing', 'Logistics']

export function isDashboardRole(value: string | undefined): value is DashboardRole {
  return Boolean(value && DASHBOARD_ROLES.includes(value as DashboardRole))
}

export const DASHBOARD_NAVIGATION: Record<DashboardRole, DashboardNavigationItem[]> = {
  Administrator: [
    { key: 'overview', label: 'Overview', icon: 'overview' },
    { key: 'members', label: 'Member management', icon: 'members' },
    { key: 'products', label: 'Marketplace & products', icon: 'products' },
    { key: 'categories', label: 'Product categories', icon: 'products' },
    { key: 'enquiries', label: 'Enquiries', icon: 'enquiries' },
    { key: 'quotations', label: 'Quotations', icon: 'quotations' },
    { key: 'orders', label: 'Orders', icon: 'orders' },
    { key: 'shipments', label: 'Logistics & shipments', icon: 'shipments' },
    { key: 'invoices', label: 'Financial management', icon: 'finance' },
    { key: 'commissions', label: 'Commission management', icon: 'commissions' },
    { key: 'documents', label: 'Compliance & documents', icon: 'documents' },
    { key: 'reports', label: 'Reports', icon: 'reports' },
    { key: 'activity', label: 'Audit log', icon: 'activity' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
    { key: 'settings', label: 'System settings', icon: 'settings' }
  ],
  Supplier: [
    { key: 'overview', label: 'Overview', icon: 'overview' },
    { key: 'products', label: 'My products', icon: 'products' },
    { key: 'inventory', label: 'Inventory & stock', icon: 'inventory' },
    { key: 'enquiries', label: 'Buyer enquiries', icon: 'enquiries' },
    { key: 'quotations', label: 'Quotations', icon: 'quotations' },
    { key: 'orders', label: 'Orders & fulfilment', icon: 'orders' },
    { key: 'profile', label: 'Business profile', icon: 'profile' },
    { key: 'documents', label: 'Verification documents', icon: 'documents' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
    { key: 'support', label: 'Support', icon: 'support' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
  Buyer: [
    { key: 'overview', label: 'Overview', icon: 'overview' },
    { key: 'marketplace', label: 'Marketplace', icon: 'products' },
    { key: 'saved-products', label: 'Saved products', icon: 'saved' },
    { key: 'enquiries', label: 'My enquiries', icon: 'enquiries' },
    { key: 'quotations', label: 'Quotations', icon: 'quotations' },
    { key: 'orders', label: 'Orders', icon: 'orders' },
    { key: 'shipments', label: 'Shipments & delivery', icon: 'shipments' },
    { key: 'invoices', label: 'Invoices & payments', icon: 'finance' },
    { key: 'documents', label: 'Verification documents', icon: 'documents' },
    { key: 'profile', label: 'Business profile', icon: 'profile' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
    { key: 'support', label: 'Support', icon: 'support' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
  Marketing: [
    { key: 'overview', label: 'Overview', icon: 'overview' },
    { key: 'referrals', label: 'Referral management', icon: 'referrals' },
    { key: 'transactions', label: 'Eligible transactions', icon: 'transactions' },
    { key: 'commissions', label: 'Commissions', icon: 'commissions' },
    { key: 'reports', label: 'Reports', icon: 'reports' },
    { key: 'activity', label: 'Activity history', icon: 'activity' },
    { key: 'profile', label: 'Profile', icon: 'profile' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
  Logistics: [
    { key: 'overview', label: 'Overview', icon: 'overview' },
    { key: 'transport-requests', label: 'Transport requests', icon: 'requests' },
    { key: 'shipments', label: 'Shipment management', icon: 'shipments' },
    { key: 'documents', label: 'Border documents', icon: 'documents' },
    { key: 'proof-of-delivery', label: 'Proof of delivery', icon: 'proof' },
    { key: 'invoices', label: 'Transport invoices', icon: 'finance' },
    { key: 'profile', label: 'Business profile', icon: 'profile' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
    { key: 'support', label: 'Support', icon: 'support' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
}

const columns = (...items: Array<[string, string]>): DashboardColumn[] => items.map(([key, label]) => ({ key, label }))

const screenDefinitions: Record<string, DashboardScreen> = {
  members: { title: 'Member management', description: 'Review member profiles, verification states, and access status.', dataKey: 'members', columns: columns(['name', 'Business / member'], ['role', 'Role'], ['email', 'Email'], ['registered', 'Registered'], ['status', 'Status']), primaryAction: 'Invite member', filters: ['Pending review', 'Verified', 'Rejected', 'Suspended', 'Invited'] },
  products: { title: 'Products & listings', description: 'Review products, supply availability, unit pricing, and marketplace approval.', dataKey: 'products', columns: columns(['name', 'Product'], ['category', 'Category'], ['supplier', 'Supplier'], ['quantity', 'Available stock'], ['price', 'Unit price'], ['status', 'Status']), primaryAction: 'Add product', filters: ['Pending approval', 'Approved', 'Rejected', 'Out of stock', 'Draft'] },
  inventory: { title: 'Inventory & stock', description: 'Keep quantities current and identify low-stock products before accepting new orders.', dataKey: 'products', columns: columns(['name', 'Product'], ['category', 'Category'], ['quantity', 'Available stock'], ['unit', 'Unit'], ['status', 'Stock status']), primaryAction: 'Update stock', filters: ['In stock', 'Low stock', 'Out of stock'] },
  categories: { title: 'Product categories', description: 'Manage marketplace category labels used when suppliers create listings.', dataKey: 'categories', columns: columns(['name', 'Category'], ['description', 'Description'], ['scope', 'Applies to'], ['status', 'Status']), primaryAction: 'Add category', filters: ['Enabled', 'Disabled'] },
  marketplace: { title: 'Marketplace', description: 'Browse approved products and start a traceable sourcing conversation with a supplier.', dataKey: 'products', columns: columns(['name', 'Product'], ['category', 'Category'], ['supplier', 'Supplier'], ['quantity', 'Available stock'], ['price', 'Unit price'], ['status', 'Availability']), primaryAction: 'New sourcing request', filters: ['Approved', 'In stock', 'Low stock'] },
  'saved-products': { title: 'Saved products', description: 'Return to products you have shortlisted for sourcing.', dataKey: 'saved-products', columns: columns(['name', 'Product'], ['supplier', 'Supplier'], ['category', 'Category'], ['price', 'Unit price'], ['status', 'Availability']), primaryAction: 'Browse marketplace', filters: ['Available', 'Unavailable'] },
  enquiries: { title: 'Enquiries', description: 'Follow requests from first response through quotation and order decisions.', dataKey: 'enquiries', columns: columns(['reference', 'Enquiry'], ['product', 'Commodity'], ['buyer', 'Buyer'], ['quantity', 'Quantity'], ['destination', 'Destination'], ['status', 'Status']), primaryAction: 'Create enquiry', filters: ['New', 'Open', 'Response sent', 'Quoted', 'Cancelled'] },
  quotations: { title: 'Quotations', description: 'Review quantities, unit prices, currency, delivery terms, and validity before deciding.', dataKey: 'quotations', columns: columns(['reference', 'Quotation'], ['product', 'Commodity'], ['supplier', 'Supplier'], ['quantity', 'Quantity'], ['amount', 'Quoted total'], ['validUntil', 'Valid until'], ['status', 'Status']), primaryAction: 'Create quotation', filters: ['Draft', 'Sent', 'Pending', 'Accepted', 'Rejected', 'Expired'] },
  orders: { title: 'Orders', description: 'Monitor confirmation, fulfilment, delivery assignments, and the related commercial record.', dataKey: 'orders', columns: columns(['reference', 'Order'], ['product', 'Commodity'], ['party', 'Trading partner'], ['quantity', 'Quantity'], ['amount', 'Order total'], ['delivery', 'Delivery'], ['status', 'Status']), primaryAction: 'Create order', filters: ['Pending confirmation', 'Confirmed', 'Preparing', 'In transit', 'Completed', 'Cancelled'] },
  shipments: { title: 'Shipment management', description: 'Review pickup, destination, assigned carrier, milestone, and proof-of-delivery information.', dataKey: 'shipments', columns: columns(['reference', 'Shipment'], ['order', 'Order'], ['origin', 'Collection'], ['destination', 'Destination'], ['provider', 'Logistics provider'], ['eta', 'Estimated delivery'], ['status', 'Status']), primaryAction: 'Update shipment', filters: ['Awaiting collection', 'Collected', 'In transit', 'Delayed', 'Delivered', 'Disputed'] },
  invoices: { title: 'Invoices & payments', description: 'View invoice amounts and payment verification. A submitted reference never counts as payment confirmation.', dataKey: 'invoices', columns: columns(['reference', 'Invoice'], ['order', 'Order'], ['party', 'Issued to / by'], ['amount', 'Amount'], ['currency', 'Currency'], ['dueDate', 'Due date'], ['status', 'Payment status']), primaryAction: 'Submit payment reference', filters: ['Unpaid', 'Reference submitted', 'Pending verification', 'Verified', 'Rejected'] },
  documents: { title: 'Compliance & documents', description: 'Review document type, owner, expiry, and review state. External authority approvals are not represented here.', dataKey: 'documents', columns: columns(['reference', 'Document'], ['owner', 'Member / shipment'], ['type', 'Document type'], ['expires', 'Expiry'], ['status', 'Review status']), primaryAction: 'Upload document', filters: ['Missing', 'Pending review', 'Approved', 'Rejected', 'Expired'] },
  'transport-requests': { title: 'Transport requests', description: 'Review cargo, pickup, destination, and agreed quotation details before accepting an assignment.', dataKey: 'transport-requests', columns: columns(['reference', 'Request'], ['order', 'Order'], ['cargo', 'Cargo'], ['origin', 'Collection'], ['destination', 'Destination'], ['charge', 'Transport estimate'], ['status', 'Status']), primaryAction: 'Submit transport quotation', filters: ['Open', 'Quoted', 'Assigned', 'Accepted', 'Declined'] },
  'proof-of-delivery': { title: 'Proof of delivery', description: 'Record delivery details and supporting file names. Secure file upload is not connected in this demo.', dataKey: 'proof-of-delivery', columns: columns(['reference', 'Delivery record'], ['order', 'Order'], ['recipient', 'Received by'], ['deliveredAt', 'Delivery date'], ['document', 'Proof file'], ['status', 'Status']), primaryAction: 'Record delivery', filters: ['Awaiting delivery', 'Delivery submitted', 'Delivered', 'Disputed', 'Failed'] },
  referrals: { title: 'Referral management', description: 'Track referral attribution and registrations without exposing unnecessary member information.', dataKey: 'referrals', columns: columns(['code', 'Referral code'], ['member', 'Referred member'], ['registered', 'Registration date'], ['eligibleTrades', 'Eligible trades'], ['status', 'Referral status']), primaryAction: 'Generate referral link', filters: ['Invited', 'Registered', 'Qualified', 'Inactive'] },
  transactions: { title: 'Eligible transactions', description: 'Review transaction status against configured referral and commission eligibility rules.', dataKey: 'transactions', columns: columns(['reference', 'Transaction'], ['order', 'Order'], ['referral', 'Referral code'], ['basis', 'Eligibility basis'], ['amount', 'Transaction value'], ['date', 'Date'], ['status', 'Eligibility']), primaryAction: 'Export transactions', filters: ['Eligible', 'Pending review', 'Ineligible', 'Reversed'] },
  commissions: { title: 'Commissions', description: 'Review calculation basis and approval history. Payment status must be verified through the configured finance workflow.', dataKey: 'commissions', columns: columns(['reference', 'Commission'], ['transaction', 'Transaction'], ['basis', 'Calculation basis'], ['amount', 'Commission amount'], ['currency', 'Currency'], ['status', 'Status']), filters: ['Pending', 'Approved', 'Rejected', 'Paid', 'Reversed'] },
  reports: { title: 'Reports', description: 'Review available demo summaries and export the rows currently shown as a CSV file.', dataKey: 'reports', columns: columns(['name', 'Report'], ['category', 'Category'], ['period', 'Reporting period'], ['updated', 'Last updated'], ['status', 'Availability']), primaryAction: 'Export CSV', filters: ['Available', 'Processing'] },
  activity: { title: 'Activity & audit history', description: 'Review recorded activity in this browser session. Production audit history requires a protected backend.', dataKey: 'activity', columns: columns(['updated', 'Time'], ['actor', 'Actor'], ['activity', 'Activity'], ['record', 'Related record'], ['status', 'Result']), filters: ['Complete', 'Pending', 'Flagged'] },
  notifications: { title: 'Notifications', description: 'Open relevant work items and mark alerts as read.', dataKey: 'notifications', columns: columns(['name', 'Notification'], ['detail', 'Details'], ['updated', 'Received'], ['status', 'Read status']), primaryAction: 'Mark all read', filters: ['Unread', 'Read'] },
  support: { title: 'Support requests', description: 'Track questions, delivery issues, and account support requests.', dataKey: 'support', columns: columns(['reference', 'Request'], ['name', 'Subject'], ['priority', 'Priority'], ['updated', 'Last updated'], ['status', 'Status']), primaryAction: 'New support request', filters: ['Open', 'In review', 'Resolved'] },
  profile: { title: 'Business profile', description: 'Review and edit the permitted profile details shown in this demo workspace.', dataKey: 'profiles', columns: columns(['name', 'Business / account'], ['email', 'Email'], ['country', 'Country'], ['phone', 'Phone'], ['status', 'Verification status']), primaryAction: 'Edit profile', filters: ['Verified', 'Pending review', 'Needs information'] },
  settings: { title: 'Settings', description: 'Manage the preferences represented in the current demo. Security and platform settings require backend authorization.', dataKey: 'settings', columns: columns(['name', 'Preference'], ['value', 'Current value'], ['scope', 'Applies to'], ['status', 'Status']), primaryAction: 'Add preference', filters: ['Enabled', 'Disabled'] },
}

const roleCopy: Partial<Record<DashboardRole, Record<string, { title?: string; description?: string; primaryAction?: string }>>> = {
  Administrator: {
    products: { title: 'Product approvals', primaryAction: 'Add category' },
    enquiries: { primaryAction: 'Export enquiries' },
    quotations: { primaryAction: 'Export quotations' },
    orders: { primaryAction: '' },
    shipments: { title: 'Logistics & shipments', primaryAction: '' },
    invoices: { title: 'Financial management', primaryAction: 'Export finance report' },
    reports: { title: 'Reports & audit exports' },
    documents: { primaryAction: '' },
    settings: { title: 'System settings', description: 'Review platform currency, categories, notification preferences, and access policies.' },
  },
  Supplier: {
    products: { title: 'My products', description: 'Create listings, maintain availability, and follow each marketplace review state.' },
    enquiries: { title: 'Buyer enquiries', description: 'Respond to requests and turn qualified conversations into quotations.', primaryAction: '' },
    orders: { title: 'Orders & fulfilment', description: 'Confirm eligible orders and keep preparation status visible to buyers.', primaryAction: '' },
    documents: { title: 'Business verification', description: 'View document requirements and review state for your supplier profile.' },
  },
  Buyer: {
    marketplace: { title: 'Approved marketplace', description: 'Browse approved product listings, save products, or create an enquiry.' },
    enquiries: { title: 'My sourcing enquiries' },
    invoices: { title: 'Invoices & payment references', description: 'Submit a reference for review; this does not mark an invoice as paid.' },
    quotations: { primaryAction: '' },
    orders: { primaryAction: '' },
    profile: { title: 'Buyer business profile' },
  },
  Marketing: {
    referrals: { title: 'Referral links & members' },
    commissions: { title: 'Commission ledger', description: 'Commission entries are sample records; amounts and payment states are not connected to real transactions.' },
  },
  Logistics: {
    shipments: { title: 'Assigned shipments', description: 'Update supported shipment milestones; this screen does not provide live GPS tracking.', primaryAction: '' },
    'transport-requests': { primaryAction: '' },
    invoices: { title: 'Transport charges & invoices', primaryAction: '' },
    documents: { title: 'Border & customs documents', description: 'Submit document metadata for review; no authority clearance is implied.' },
    'proof-of-delivery': { title: 'Proof of delivery' },
  },
}

export const DEMO_DATA: Record<string, DemoRecord[]> = {
  members: [
    { id: 'MEM-104', name: 'Chisomo Grain Cooperative', email: 'ops@chisomograin.demo', role: 'Supplier', registered: '2026-10-18', status: 'Pending review', updated: 'Today' },
    { id: 'MEM-103', name: 'Lakeview Produce Buyers', email: 'sourcing@lakeview.demo', role: 'Buyer', registered: '2026-10-15', status: 'Verified', updated: 'Yesterday' },
    { id: 'MEM-102', name: 'Mzuzu Harvest Traders', email: 'trade@mzuzuharvest.demo', role: 'Supplier', registered: '2026-10-12', status: 'Needs information', updated: '3 days ago' },
    { id: 'MEM-101', name: 'Central Corridor Haulage', email: 'dispatch@corridor.demo', role: 'Logistics', registered: '2026-10-08', status: 'Verified', updated: '4 days ago' },
  ],
  categories: [
    { id: 'CAT-004', reference: 'CAT-004', name: 'Grains', description: 'Cereal grains and staple crops', scope: 'Marketplace', status: 'Enabled', updated: 'Today' },
    { id: 'CAT-003', reference: 'CAT-003', name: 'Legumes', description: 'Beans, peas, and other pulses', scope: 'Marketplace', status: 'Enabled', updated: 'Today' },
    { id: 'CAT-002', reference: 'CAT-002', name: 'Oils', description: 'Edible oils and oil crops', scope: 'Marketplace', status: 'Enabled', updated: 'Yesterday' },
  ],
  products: [
    { id: 'PRD-421', name: 'White maize, grade 1', category: 'Grains', supplier: 'Chisomo Grain Cooperative', quantity: '240', unit: 'tonnes', price: 'MK 685,000', currency: 'MWK', status: 'Pending approval', updated: 'Today' },
    { id: 'PRD-420', name: 'Shelled groundnuts', category: 'Legumes', supplier: 'Chisomo Grain Cooperative', quantity: '35', unit: 'tonnes', price: 'MK 2,150,000', currency: 'MWK', status: 'Approved', updated: 'Yesterday' },
    { id: 'PRD-418', name: 'Soya beans, cleaned', category: 'Legumes', supplier: 'Mzuzu Harvest Traders', quantity: '80', unit: 'tonnes', price: 'MK 1,420,000', currency: 'MWK', status: 'Approved', updated: 'Yesterday' },
    { id: 'PRD-405', name: 'Sunflower cooking oil', category: 'Oils', supplier: 'Shire Valley Foods', quantity: '12,000', unit: 'litres', price: 'MK 4,800', currency: 'MWK', status: 'Low stock', updated: '2 days ago' },
    { id: 'PRD-398', name: 'Red kidney beans', category: 'Legumes', supplier: 'Central Farm Alliance', quantity: '0', unit: 'tonnes', price: 'MK 1,850,000', currency: 'MWK', status: 'Out of stock', updated: '4 days ago' },
  ],
  enquiries: [
    { id: 'ENQ-218', reference: 'ENQ-218', name: 'White maize, grade 1', product: 'White maize, grade 1', buyer: 'Lakeview Produce Buyers', supplier: 'Chisomo Grain Cooperative', quantity: '120 tonnes', destination: 'Lubumbashi, DRC', status: 'New', updated: 'Today' },
    { id: 'ENQ-214', reference: 'ENQ-214', name: 'Soya beans, cleaned', product: 'Soya beans, cleaned', buyer: 'Copperbelt Foods', supplier: 'Mzuzu Harvest Traders', quantity: '40 tonnes', destination: 'Kasumbalesa, DRC', status: 'Response sent', updated: 'Yesterday' },
    { id: 'ENQ-209', reference: 'ENQ-209', name: 'Sunflower cooking oil', product: 'Sunflower cooking oil', buyer: 'Mchinji Wholesale', supplier: 'Shire Valley Foods', quantity: '2,000 litres', destination: 'Lilongwe, Malawi', status: 'Quoted', updated: '3 days ago' },
  ],
  quotations: [
    { id: 'QUO-081', reference: 'QUO-081', name: 'Maize supply proposal', product: 'White maize, grade 1', supplier: 'Chisomo Grain Cooperative', buyer: 'Lakeview Produce Buyers', quantity: '120 tonnes', amount: 'USD 34,800', validUntil: '2026-11-05', status: 'Pending', updated: 'Today' },
    { id: 'QUO-077', reference: 'QUO-077', name: 'Soya beans supply', product: 'Soya beans, cleaned', supplier: 'Mzuzu Harvest Traders', buyer: 'Copperbelt Foods', quantity: '40 tonnes', amount: 'USD 22,400', validUntil: '2026-10-30', status: 'Sent', updated: 'Yesterday' },
    { id: 'QUO-069', reference: 'QUO-069', name: 'Cooking oil supply', product: 'Sunflower cooking oil', supplier: 'Shire Valley Foods', buyer: 'Mchinji Wholesale', quantity: '2,000 litres', amount: 'MK 9,600,000', validUntil: '2026-10-20', status: 'Expired', updated: '5 days ago' },
  ],
  orders: [
    { id: 'ORD-304', reference: 'ORD-304', name: 'Maize supply order', product: 'White maize, grade 1', party: 'Lakeview Produce Buyers ↔ Chisomo Grain Cooperative', quantity: '120 tonnes', amount: 'USD 34,800', delivery: 'Lubumbashi, DRC', status: 'Confirmed', updated: 'Today' },
    { id: 'ORD-299', reference: 'ORD-299', name: 'Soya beans order', product: 'Soya beans, cleaned', party: 'Copperbelt Foods ↔ Mzuzu Harvest Traders', quantity: '40 tonnes', amount: 'USD 22,400', delivery: 'Kasumbalesa, DRC', status: 'Preparing', updated: 'Yesterday' },
    { id: 'ORD-281', reference: 'ORD-281', name: 'Cooking oil order', product: 'Sunflower cooking oil', party: 'Mchinji Wholesale ↔ Shire Valley Foods', quantity: '2,000 litres', amount: 'MK 9,600,000', delivery: 'Lilongwe, Malawi', status: 'In transit', updated: '4 days ago' },
  ],
  shipments: [
    { id: 'SHP-092', reference: 'SHP-092', name: 'Maize delivery', order: 'ORD-304', origin: 'Lilongwe, Malawi', destination: 'Lubumbashi, DRC', provider: 'Central Corridor Haulage', eta: '2026-10-29', status: 'Awaiting collection', updated: 'Today' },
    { id: 'SHP-087', reference: 'SHP-087', name: 'Soya beans delivery', order: 'ORD-299', origin: 'Mzuzu, Malawi', destination: 'Kasumbalesa, DRC', provider: 'Lake Route Logistics', eta: '2026-10-27', status: 'In transit', updated: 'Yesterday' },
    { id: 'SHP-075', reference: 'SHP-075', name: 'Cooking oil delivery', order: 'ORD-281', origin: 'Blantyre, Malawi', destination: 'Lilongwe, Malawi', provider: 'Central Corridor Haulage', eta: '2026-10-25', status: 'Delayed', updated: '2 days ago' },
  ],
  invoices: [
    { id: 'INV-229', reference: 'INV-229', name: 'Maize order invoice', order: 'ORD-304', party: 'Lakeview Produce Buyers', buyer: 'Lakeview Produce Buyers', supplier: 'Chisomo Grain Cooperative', amount: 'USD 34,800', currency: 'USD', dueDate: '2026-11-03', status: 'Unpaid', updated: 'Today' },
    { id: 'INV-224', reference: 'INV-224', name: 'Soya beans invoice', order: 'ORD-299', party: 'Copperbelt Foods', buyer: 'Copperbelt Foods', supplier: 'Mzuzu Harvest Traders', amount: 'USD 22,400', currency: 'USD', dueDate: '2026-10-30', status: 'Reference submitted', updated: 'Yesterday' },
    { id: 'INV-198', reference: 'INV-198', name: 'Transport service invoice', order: 'ORD-281', party: 'Mchinji Wholesale', buyer: 'Mchinji Wholesale', supplier: 'Central Corridor Haulage', amount: 'MK 580,000', currency: 'MWK', dueDate: '2026-10-22', status: 'Pending verification', updated: '3 days ago' },
  ],
  documents: [
    { id: 'DOC-334', reference: 'DOC-334', name: 'Business registration certificate', owner: 'Chisomo Grain Cooperative', type: 'Business registration', expires: '2027-06-30', status: 'Pending review', updated: 'Today' },
    { id: 'DOC-332', reference: 'DOC-332', name: 'Buyer business registration', owner: 'Lakeview Produce Buyers', type: 'Business registration', expires: '2027-08-31', status: 'Pending review', updated: 'Today' },
    { id: 'DOC-329', reference: 'DOC-329', name: 'Tax clearance certificate', owner: 'Mzuzu Harvest Traders', type: 'Tax clearance', expires: '2026-12-31', status: 'Approved', updated: 'Yesterday' },
    { id: 'DOC-317', reference: 'DOC-317', name: 'Cargo manifest', owner: 'SHP-092', type: 'Shipment document', expires: 'Not applicable', status: 'Missing', updated: '2 days ago' },
  ],
  'transport-requests': [
    { id: 'TRN-051', reference: 'TRN-051', name: 'ORD-304 · Maize cargo', order: 'ORD-304', cargo: '120 tonnes · bagged maize', origin: 'Lilongwe, Malawi', destination: 'Lubumbashi, DRC', charge: 'USD 2,400', status: 'Open', updated: 'Today' },
    { id: 'TRN-048', reference: 'TRN-048', name: 'ORD-299 · Soya cargo', order: 'ORD-299', cargo: '40 tonnes · soya beans', origin: 'Mzuzu, Malawi', destination: 'Kasumbalesa, DRC', charge: 'USD 1,700', provider: 'Central Corridor Haulage', status: 'Quoted', updated: 'Yesterday' },
    { id: 'TRN-044', reference: 'TRN-044', name: 'ORD-274 · Grain cargo', order: 'ORD-274', cargo: '22 tonnes · mixed grain', origin: 'Lilongwe, Malawi', destination: 'Ndola, Zambia', charge: 'USD 1,350', provider: 'Central Corridor Haulage', status: 'Assigned', updated: '2 days ago' },
  ],
  'proof-of-delivery': [
    { id: 'POD-023', reference: 'POD-023', name: 'ORD-281 delivery', order: 'ORD-281', recipient: 'Mchinji Wholesale', deliveredAt: 'Awaiting delivery', document: 'Not uploaded', status: 'Awaiting delivery', updated: 'Today' },
    { id: 'POD-020', reference: 'POD-020', name: 'ORD-274 delivery', order: 'ORD-274', recipient: 'Copperbelt Foods', deliveredAt: '2026-10-20', document: 'pod-ord274.pdf (demo)', status: 'Delivered', updated: '5 days ago' },
  ],
  referrals: [
    { id: 'REF-038', reference: 'REF-038', name: 'Lakeview Produce Buyers', member: 'Lakeview Produce Buyers', marketer: 'MASALA FOOD Growth Partner', code: 'MASALA-MW-018', registered: '2026-10-15', eligibleTrades: '2', status: 'Qualified', updated: 'Today' },
    { id: 'REF-035', reference: 'REF-035', name: 'Copperbelt Foods', member: 'Copperbelt Foods', marketer: 'MASALA FOOD Growth Partner', code: 'MASALA-MW-016', registered: '2026-10-12', eligibleTrades: '1', status: 'Registered', updated: 'Yesterday' },
    { id: 'REF-031', reference: 'REF-031', name: 'Central Farm Alliance', member: 'Central Farm Alliance', marketer: 'MASALA FOOD Growth Partner', code: 'MASALA-MW-011', registered: '2026-10-08', eligibleTrades: '0', status: 'Invited', updated: '3 days ago' },
  ],
  transactions: [
    { id: 'TXN-120', reference: 'TXN-120', name: 'ORD-304 · Eligible trade', order: 'ORD-304', referral: 'MASALA-MW-018', basis: 'Completed qualifying order', amount: 'USD 34,800', date: '2026-10-23', status: 'Eligible', updated: 'Today' },
    { id: 'TXN-117', reference: 'TXN-117', name: 'ORD-299 · Review', order: 'ORD-299', referral: 'MASALA-MW-016', basis: 'Order fulfilment pending', amount: 'USD 22,400', date: '2026-10-22', status: 'Pending review', updated: 'Yesterday' },
  ],
  commissions: [
    { id: 'COM-048', reference: 'COM-048', name: 'ORD-304 referral commission', transaction: 'TXN-120', marketer: 'MASALA FOOD Growth Partner', basis: '3% of eligible trade', amount: 'USD 1,044', currency: 'USD', status: 'Pending', updated: 'Today' },
    { id: 'COM-044', reference: 'COM-044', name: 'ORD-274 referral commission', transaction: 'TXN-109', marketer: 'MASALA FOOD Growth Partner', basis: '3% of eligible trade', amount: 'MK 312,000', currency: 'MWK', status: 'Approved', updated: 'Yesterday' },
  ],
  reports: [
    { id: 'RPT-015', reference: 'RPT-015', name: 'Member registration summary', category: 'Members', period: 'October 2026', status: 'Available', updated: 'Today' },
    { id: 'RPT-014', reference: 'RPT-014', name: 'Marketplace listing review', category: 'Products', period: 'October 2026', status: 'Available', updated: 'Yesterday' },
    { id: 'RPT-012', reference: 'RPT-012', name: 'Shipment status digest', category: 'Logistics', period: 'September 2026', status: 'Available', updated: '3 days ago' },
  ],
  activity: [
    { id: 'ACT-086', reference: 'ACT-086', name: 'Listing submitted for review', actor: 'Chisomo Grain Cooperative', activity: 'Created listing PRD-421', record: 'PRD-421', status: 'Complete', updated: 'Today, 09:42' },
    { id: 'ACT-083', reference: 'ACT-083', name: 'Buyer quotation received', actor: 'Lakeview Produce Buyers', activity: 'Submitted enquiry ENQ-218', record: 'ENQ-218', status: 'Complete', updated: 'Today, 08:16' },
    { id: 'ACT-079', reference: 'ACT-079', name: 'Shipment milestone updated', actor: 'Central Corridor Haulage', activity: 'SHP-087 marked In transit', record: 'SHP-087', status: 'Complete', updated: 'Yesterday' },
  ],
  notifications: [
    { id: 'NTF-046', reference: 'NTF-046', name: 'New buyer enquiry', detail: 'ENQ-218 requests 120 tonnes of white maize.', audience: 'Supplier', target: 'enquiries', status: 'Unread', updated: 'Today' },
    { id: 'NTF-043', reference: 'NTF-043', name: 'Quotation received', detail: 'QUO-081 is ready for review.', audience: 'Buyer', target: 'quotations', status: 'Unread', updated: 'Yesterday' },
    { id: 'NTF-039', reference: 'NTF-039', name: 'Document review update', detail: 'A business document changed review status.', audience: 'Administrator', target: 'documents', status: 'Read', updated: '3 days ago' },
    { id: 'NTF-037', reference: 'NTF-037', name: 'Shipment assignment', detail: 'SHP-092 is awaiting collection.', audience: 'Logistics', target: 'shipments', status: 'Unread', updated: 'Today' },
    { id: 'NTF-034', reference: 'NTF-034', name: 'Commission needs review', detail: 'COM-048 is pending review.', audience: 'Marketing', target: 'commissions', status: 'Unread', updated: 'Today' },
  ],
  support: [
    { id: 'SUP-031', reference: 'SUP-031', name: 'Shipment arrival timing', priority: 'Normal', owner: 'Lakeview Produce Buyers', status: 'Open', updated: 'Today' },
    { id: 'SUP-028', reference: 'SUP-028', name: 'Business verification question', priority: 'High', owner: 'Mzuzu Harvest Traders', status: 'In review', updated: 'Yesterday' },
  ],
  profiles: [
    { id: 'PRF-001', reference: 'PRF-001', name: 'MASALA FOOD Demo Account', email: 'member@masala.food', country: 'Malawi', phone: '+265 000 000 000', status: 'Needs information', updated: 'Today' },
  ],
  settings: [
    { id: 'SET-001', reference: 'SET-001', name: 'Display currency', value: 'MWK', scope: 'This demo session', status: 'Enabled', updated: 'Today' },
    { id: 'SET-002', reference: 'SET-002', name: 'Email notifications', value: 'On', scope: 'Account preference', status: 'Enabled', updated: 'Today' },
    { id: 'SET-003', reference: 'SET-003', name: 'Two-step verification', value: 'Not configured', scope: 'Account security', status: 'Disabled', updated: 'Today' },
    { id: 'SET-004', reference: 'SET-004', name: 'Commission rule', value: 'Requires business configuration', scope: 'Marketing commissions', status: 'Disabled', updated: 'Today' },
    { id: 'SET-005', reference: 'SET-005', name: 'Exchange-rate source', value: 'Not configured', scope: 'Finance', status: 'Disabled', updated: 'Today' }
  ],
  'saved-products': [
    { id: 'SAV-018', reference: 'PRD-418', name: 'Soya beans, cleaned', buyer: 'Lakeview Produce Buyers', supplier: 'Mzuzu Harvest Traders', category: 'Legumes', price: 'MK 1,420,000', status: 'Available', updated: 'Today' },
    { id: 'SAV-013', reference: 'PRD-405', name: 'Sunflower cooking oil', buyer: 'Lakeview Produce Buyers', supplier: 'Shire Valley Foods', category: 'Oils', price: 'MK 4,800', status: 'Low stock', updated: 'Yesterday' },
  ],
}

export function getDashboardScreen(role: DashboardRole, section: string): DashboardScreen | null {
  const base = screenDefinitions[section]
  if (!base) return null
  const override = roleCopy[role]?.[section]
  const primaryAction = override?.primaryAction ?? base.primaryAction
  return { ...base, ...override, primaryAction, demoNote: 'Demo records only — changes stay in this browser session and are not saved to a server.' }
}

export function getOverviewMetrics(role: DashboardRole, data: Record<string, DemoRecord[]>) {
  const count = (key: string, predicate?: (record: DemoRecord) => boolean) => (data[key] ?? []).filter((record) => !predicate || predicate(record)).length
  const cards: Record<DashboardRole, Array<{ label: string; value: number; target: string; detail: string }>> = {
    Administrator: [
      { label: 'Members', value: count('members'), target: 'members', detail: 'Registered demo accounts' },
      { label: 'Member verifications', value: count('members', (item) => item.status === 'Pending review' || item.status === 'Needs information'), target: 'members', detail: 'Require review' },
      { label: 'Product approvals', value: count('products', (item) => item.status === 'Pending approval'), target: 'products', detail: 'Awaiting approval' },
      { label: 'Active orders', value: count('orders', (item) => item.status !== 'Completed' && item.status !== 'Cancelled'), target: 'orders', detail: 'Open order records' },
    ],
    Supplier: [
      { label: 'Product listings', value: count('products'), target: 'products', detail: 'Across demo catalogue' },
      { label: 'Pending review', value: count('products', (item) => item.status === 'Pending approval'), target: 'products', detail: 'Awaiting approval' },
      { label: 'Buyer enquiries', value: count('enquiries'), target: 'enquiries', detail: 'Across demo records' },
      { label: 'Open orders', value: count('orders', (item) => item.status !== 'Completed'), target: 'orders', detail: 'Need fulfilment updates' },
    ],
    Buyer: [
      { label: 'Open enquiries', value: count('enquiries'), target: 'enquiries', detail: 'Sourcing conversations' },
      { label: 'Pending quotations', value: count('quotations', (item) => item.status === 'Pending' || item.status === 'Sent'), target: 'quotations', detail: 'Ready for review' },
      { label: 'Shipments in progress', value: count('shipments', (item) => item.status !== 'Delivered'), target: 'shipments', detail: 'No live GPS connection' },
      { label: 'Saved products', value: count('saved-products'), target: 'saved-products', detail: 'Shortlisted for sourcing' },
    ],
    Marketing: [
      { label: 'Referred members', value: count('referrals'), target: 'referrals', detail: 'Attributed demo referrals' },
      { label: 'Eligible transactions', value: count('transactions', (item) => item.status === 'Eligible'), target: 'transactions', detail: 'Based on demo status' },
      { label: 'Pending commissions', value: count('commissions', (item) => item.status === 'Pending'), target: 'commissions', detail: 'Not a payment promise' },
      { label: 'Approved commissions', value: count('commissions', (item) => item.status === 'Approved'), target: 'commissions', detail: 'Payment not initiated' },
    ],
    Logistics: [
      { label: 'Transport requests', value: count('transport-requests'), target: 'transport-requests', detail: 'Available demo requests' },
      { label: 'Assigned shipments', value: count('shipments', (item) => item.status !== 'Delivered'), target: 'shipments', detail: 'Current demo assignments' },
      { label: 'In transit', value: count('shipments', (item) => item.status === 'In transit'), target: 'shipments', detail: 'Milestone status only' },
      { label: 'Delivery records', value: count('proof-of-delivery'), target: 'proof-of-delivery', detail: 'Proof of delivery history' },
    ],
  }
  return cards[role]
}

export function getPrimaryTarget(role: DashboardRole, section: string, dataKey: string) {
  if (role === 'Buyer' && section === 'marketplace') return 'enquiries'
  if (role === 'Administrator' && section === 'products') return 'categories'
  if (section === 'invoices' && role === 'Buyer') return 'invoices'
  if (section === 'reports') return 'reports'
  return dataKey
}

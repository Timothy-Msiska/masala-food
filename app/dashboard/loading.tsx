export default function DashboardLoading() {
  return (
    <main className="app-dashboard-shell" aria-busy="true" aria-label="Loading dashboard">
      <aside className="app-dashboard-sidebar app-dashboard-loading-sidebar"><span className="app-dashboard-brand"><span>MF</span><strong>MASALA<br />FOOD</strong></span><div className="app-dashboard-loading-nav" /> <div className="app-dashboard-loading-nav" /><div className="app-dashboard-loading-nav" /></aside>
      <section className="app-dashboard-loading-main"><div className="app-dashboard-loading-bar" /><div className="app-dashboard-loading-bar is-short" /><div className="app-dashboard-loading-grid"><i /><i /><i /><i /></div><div className="app-dashboard-loading-table" /></section>
    </main>
  )
}

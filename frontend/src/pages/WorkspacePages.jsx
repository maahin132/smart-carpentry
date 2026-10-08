import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { api, postWithCsrf, requestWithCsrf } from '../auth/api'
import { useAuth } from '../auth/useAuth'
import '../styles/public-pages.css'

const pageClass = 'sc-page mx-auto max-w-[1440px] px-6 py-16 sm:py-20 lg:px-10 lg:py-24'
const buttonClass = 'sc-button'
const secondaryButtonClass = 'sc-button sc-button-secondary'

function BackLink({ to, children }) {
  return <Link className="sc-text-link mb-8" to={to}>← {children}</Link>
}

function LoadState({ loading, error, onRetry }) {
  if (loading) return <p aria-live="polite">Loading your workspace…</p>
  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button className={`${secondaryButtonClass} mt-4`} type="button" onClick={onRetry}>Try again</button>
      </div>
    )
  }
  return null
}

function useOwnedRecord(path) {
  const [result, setResult] = useState({ key: '', record: null, error: '' })
  const [reload, setReload] = useState(0)
  const key = `${path}:${reload}`

  useEffect(() => {
    let active = true
    api.get(path)
      .then(({ data }) => { if (active) setResult({ key, record: data, error: '' }) })
      .catch((requestError) => {
        if (!active) return
        setResult({
          key,
          record: null,
          error: requestError.response?.status === 404
            ? 'This record was not found in your account.'
            : 'Your workspace could not be loaded. Check your connection and try again.',
        })
      })
    return () => { active = false }
  }, [key, path])

  return {
    record: result.key === key ? result.record : null,
    loading: result.key !== key,
    error: result.key === key ? result.error : '',
    retry: () => setReload((value) => value + 1),
  }
}

function DashboardLink({ to, title, description }) {
  return (
    <Link to={to} className="sc-service-card sc-dashboard-link">
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="sc-text-link">Open <span aria-hidden="true">→</span></span>
    </Link>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  return (
    <main id="main-content" className={pageClass}>
      <header className="sc-page-intro">
        <p className="sc-eyebrow">Workspace</p>
        <h1>Good to see you,<br />{user.first_name || 'maker'}.</h1>
        <p className="sc-page-lede">Keep your estimates, cutting plans and quotations together as you move a project from planning toward the workshop.</p>
      </header>
      <section className="sc-card-grid sc-page-section" aria-label="Workspace links">
        <DashboardLink to="/estimates/new" title="Create estimate" description="Start a material and cost estimate from your project dimensions." />
        <DashboardLink to="/estimates" title="My estimates" description="Review estimates saved to your account." />
        <DashboardLink to="/cutting-plans" title="Cutting plans" description="Open saved sheet layouts and plan details." />
        <DashboardLink to="/quotations" title="Quotations" description="Review quotations prepared from your projects." />
        <DashboardLink to="/profile" title="Profile" description="View your account and organization details." />
        <DashboardLink to="/settings" title="Settings" description="Update your profile and account security." />
        {user.role === 'admin' && <DashboardLink to="/admin/" title="Administration" description="Manage the product in Django's permission-checked administration site." />}
      </section>
    </main>
  )
}

export function EstimatesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true
    api.get('/estimates/')
      .then(({ data }) => { if (active) setItems(data.results || data) })
      .catch(() => { if (active) setError('Your estimates could not be loaded. Check your connection and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])

  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/dashboard">Dashboard</BackLink>
      <header className="sc-page-intro">
        <p className="sc-eyebrow">Your estimates</p>
        <h1>Project planning,<br />kept together.</h1>
        <p className="sc-page-lede">Only estimates saved to your account are shown here.</p>
        <Link className={buttonClass} to="/estimates/new">Create estimate</Link>
      </header>
      <section className="sc-page-section">
        <LoadState loading={loading} error={error} onRetry={() => { setError(''); setLoading(true); setReload((value) => value + 1) }} />
        {!loading && !error && (items.length ? (
          <div className="sc-feature-rows">
            {items.map((item) => (
              <article className="sc-feature-row" key={item.id}>
                <span className="sc-number">#{item.id}</span>
                <h3><Link className="sc-text-link" to={`/estimates/${item.id}`}>{item.title || `Estimate ${item.id}`}</Link></h3>
                <p>{item.status} · Updated {new Date(item.updated_at).toLocaleDateString()}</p>
              </article>
            ))}
          </div>
        ) : <p className="sc-empty-state">No saved estimates yet. Create an estimate to begin your project workflow.</p>)}
      </section>
    </main>
  )
}

export function EstimateDetailPage() {
  const { id } = useParams()
  const { record, loading, error, retry } = useOwnedRecord(`/estimates/${id}/`)
  const [actionError, setActionError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  const deleteEstimate = async () => {
    if (!window.confirm('Delete this estimate from your account?')) return
    setDeleting(true)
    setActionError('')
    try {
      await requestWithCsrf('delete', `/estimates/${id}/`)
      navigate('/estimates', { replace: true })
    } catch {
      setActionError('The estimate could not be deleted. Try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/estimates">Estimates</BackLink>
      <LoadState loading={loading} error={error} onRetry={retry} />
      {record && <>
        <header className="sc-page-intro">
          <p className="sc-eyebrow">Estimate #{record.id}</p>
          <h1>{record.title || 'Project estimate'}</h1>
          <p className="sc-page-lede">{record.status} · Created {new Date(record.created_at).toLocaleDateString()}</p>
        </header>
        <section className="sc-editorial-grid">
          <div><h2>Inputs</h2><pre className="sc-record-json">{JSON.stringify(record.inputs, null, 2)}</pre></div>
          <div><h2>Planning result</h2><pre className="sc-record-json">{JSON.stringify(record.result, null, 2)}</pre></div>
        </section>
        <div className="sc-form-actions">
          <Link className={buttonClass} to="/quotations/new" state={{ estimate: record }}>Create quotation</Link>
          <Link className={secondaryButtonClass} to="/estimates/new">Start another estimate</Link>
          <button className={secondaryButtonClass} type="button" onClick={deleteEstimate} disabled={deleting}>{deleting ? 'Deleting…' : 'Delete estimate'}</button>
        </div>
        {actionError && <p className="sc-form-error" role="alert">{actionError}</p>}
      </>}
    </main>
  )
}

export function QuotationsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true
    api.get('/quotations/')
      .then(({ data }) => { if (active) setItems(data.results || data) })
      .catch(() => { if (active) setError('Your quotations could not be loaded. Check your connection and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])

  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/dashboard">Dashboard</BackLink>
      <header className="sc-page-intro"><p className="sc-eyebrow">Quotations</p><h1>Project quotes,<br />in one place.</h1></header>
      <LoadState loading={loading} error={error} onRetry={() => { setError(''); setLoading(true); setReload((value) => value + 1) }} />
      {!loading && !error && (items.length ? (
        <div className="sc-feature-rows">
          {items.map((item) => <article className="sc-feature-row" key={item.id}>
            <span className="sc-number">#{item.id}</span>
            <h3><Link className="sc-text-link" to={`/quotations/${item.id}`}>{item.reference}</Link></h3>
            <p>{item.status} · {item.currency} {item.subtotal}</p>
          </article>)}
        </div>
      ) : <p className="sc-empty-state">No quotations yet. Open a saved estimate to prepare a quotation.</p>)}
    </main>
  )
}

export function QuotationCreatePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { estimate } = location.state || {}
  const [currency, setCurrency] = useState('')
  const [subtotal, setSubtotal] = useState('')
  const [taxAmount, setTaxAmount] = useState('0')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (!estimate) return <Navigate to="/estimates" replace />

  const createQuotation = async (event) => {
    event.preventDefault()
    const value = Number(subtotal)
    const tax = Number(taxAmount)
    if (!/^[A-Z]{3}$/.test(currency) || !Number.isFinite(value) || value < 0 || !Number.isFinite(tax) || tax < 0) {
      setError('Enter a three-letter currency code, a non-negative subtotal and a non-negative tax amount.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const quotationResponse = await postWithCsrf('/quotations/from-estimate/', {
        estimate: estimate.id,
        currency,
        subtotal: value,
        tax_amount: tax,
      })
      navigate(`/quotations/${quotationResponse.data.id}`, { replace: true })
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'The quotation could not be created. Check your inputs and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main id="main-content" className={pageClass}>
      <BackLink to={`/estimates/${estimate.id}`}>Estimate #{estimate.id}</BackLink>
      <header className="sc-page-intro"><p className="sc-eyebrow">Prepare quotation</p><h1>{estimate.title || 'Project estimate'}</h1><p className="sc-page-lede">The quotation will be connected to this estimate. Enter the currency and customer-facing subtotal you have reviewed.</p></header>
      <form className="sc-tool-form sc-settings-form" onSubmit={createQuotation}>
        <label className="sc-field"><span>Currency code</span><input className="sc-input" value={currency} onChange={(event) => setCurrency(event.target.value.toUpperCase().slice(0, 3))} placeholder="e.g. INR" required maxLength="3" /></label>
        <label className="sc-field"><span>Quotation subtotal</span><input className="sc-input" type="number" min="0" step="0.01" value={subtotal} onChange={(event) => setSubtotal(event.target.value)} required /></label>
        <label className="sc-field"><span>Tax amount</span><input className="sc-input" type="number" min="0" step="0.01" value={taxAmount} onChange={(event) => setTaxAmount(event.target.value)} required /></label>
        {error && <p className="sc-form-error" role="alert">{error}</p>}
        <button className={buttonClass} type="submit" disabled={saving}>{saving ? 'Creating…' : 'Create quotation'}</button>
      </form>
    </main>
  )
}

export function QuotationDetailPage() {
  const { id } = useParams()
  const { record, loading, error, retry } = useOwnedRecord(`/quotations/${id}/`)
  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/quotations">Quotations</BackLink>
      <LoadState loading={loading} error={error} onRetry={retry} />
      {record && <>
        <header className="sc-page-intro"><p className="sc-eyebrow">Quotation</p><h1>{record.reference}</h1><p className="sc-page-lede">{record.status} · {record.currency} {record.subtotal}</p></header>
        <section className="sc-page-section"><h2>Line items</h2><pre className="sc-record-json">{JSON.stringify(record.line_items, null, 2)}</pre></section>
        <div className="sc-form-actions"><button className={buttonClass} type="button" onClick={() => window.print()}>Print quotation</button><Link className={secondaryButtonClass} to="/dashboard">Back to dashboard</Link></div>
      </>}
    </main>
  )
}

export function CuttingPlansPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  useEffect(() => {
    let active = true
    api.get('/cutting-plans/')
      .then(({ data }) => { if (active) setItems(data.results || data) })
      .catch(() => { if (active) setError('Your cutting plans could not be loaded. Check your connection and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])
  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/dashboard">Dashboard</BackLink>
      <header className="sc-page-intro"><p className="sc-eyebrow">Cutting plans</p><h1>Saved for the<br />next cut.</h1><p className="sc-page-lede">Review layouts saved from the cutting optimizer.</p><Link className={buttonClass} to="/optimizer">Create cutting plan</Link></header>
      <LoadState loading={loading} error={error} onRetry={() => { setError(''); setLoading(true); setReload((value) => value + 1) }} />
      {!loading && !error && (items.length ? <div className="sc-feature-rows">{items.map((item) => <article className="sc-feature-row" key={item.id}><span className="sc-number">#{item.id}</span><h3><Link className="sc-text-link" to={`/cutting-plans/${item.id}`}>Sheet {item.sheet_width_mm} × {item.sheet_height_mm} mm</Link></h3><p>{item.parts.length} part entries · {new Date(item.created_at).toLocaleDateString()}</p></article>)}</div> : <p className="sc-empty-state">No saved cutting plans yet. Generate and save a layout in the optimizer.</p>)}
    </main>
  )
}

export function CuttingPlanDetailPage() {
  const { id } = useParams()
  const { record, loading, error, retry } = useOwnedRecord(`/cutting-plans/${id}/`)
  const navigate = useNavigate()
  const [actionError, setActionError] = useState('')
  const removePlan = async () => {
    if (!window.confirm('Delete this cutting plan from your account?')) return
    try {
      await requestWithCsrf('delete', `/cutting-plans/${id}/`)
      navigate('/cutting-plans', { replace: true })
    } catch {
      setActionError('The cutting plan could not be deleted. Try again.')
    }
  }
  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/cutting-plans">Cutting plans</BackLink>
      <LoadState loading={loading} error={error} onRetry={retry} />
      {record && <>
        <header className="sc-page-intro"><p className="sc-eyebrow">Saved cutting plan #{record.id}</p><h1>{record.sheet_width_mm} × {record.sheet_height_mm} mm</h1><p className="sc-page-lede">Kerf {record.kerf_mm} mm · Created {new Date(record.created_at).toLocaleDateString()}</p></header>
        <pre className="sc-record-json">{JSON.stringify(record.layout, null, 2)}</pre>
        <div className="sc-form-actions"><button className={buttonClass} type="button" onClick={() => window.print()}>Print plan</button><Link className={secondaryButtonClass} to="/optimizer">Create another plan</Link><button className={secondaryButtonClass} type="button" onClick={removePlan}>Delete plan</button></div>
        {actionError && <p className="sc-form-error" role="alert">{actionError}</p>}
      </>}
    </main>
  )
}

export function ProfilePage() {
  const { user } = useAuth()
  return (
    <main id="main-content" className={pageClass}>
      <BackLink to="/dashboard">Dashboard</BackLink>
      <header className="sc-page-intro"><p className="sc-eyebrow">Profile</p><h1>Your account<br />at a glance.</h1></header>
      <section className="sc-feature-rows">
        <article className="sc-feature-row"><span className="sc-number">01</span><h2>Email</h2><p>{user.email}</p></article>
        <article className="sc-feature-row"><span className="sc-number">02</span><h2>Name</h2><p>{[user.first_name, user.last_name].filter(Boolean).join(' ') || 'Not provided'}</p></article>
        <article className="sc-feature-row"><span className="sc-number">03</span><h2>Organization</h2><p>{user.organization || 'Not provided'}</p></article>
      </section>
      <Link className={`${buttonClass} mt-8`} to="/settings">Edit profile and security settings</Link>
    </main>
  )
}

export function AdminRedirect() {
  const { user } = useAuth()
  const adminUrl = `${new URL(api.defaults.baseURL).origin}/admin/`
  useEffect(() => {
    if (user?.role === 'admin') window.location.replace(adminUrl)
  }, [user, adminUrl])
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <main className={pageClass} aria-live="polite">Opening the secured administration site…</main>
}

import { useMemo, useState } from 'react'

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../auth/useAuth'

import Furniture from '../components/home/Furniture/Furniture'

import '../styles/public-pages.css'



const materialCatalog = [

  ['Plywood', 'A versatile sheet material used across cabinetry, furniture and interior construction.', 'Sheet good'],

  ['MDF', 'A smooth, consistent board for painted furniture, panels and detailed work.', 'Sheet good'],

  ['Blockboard', 'A lightweight board often selected for long panels, doors and furniture parts.', 'Sheet good'],

  ['Particle Board', 'An engineered board used for selected furniture and interior applications.', 'Sheet good'],

  ['Laminate', 'A decorative surface finish available in a range of colours and textures.', 'Surface finish'],

  ['Veneer', 'A natural wood surface layer chosen for the grain and character of real timber.', 'Surface finish'],

  ['Edge Band', 'A finishing strip used to protect and complete exposed board edges.', 'Edge finishing'],

  ['Hardware', 'Functional parts such as hinges, channels, handles, connectors and fittings.', 'Components'],

]



const serviceCatalog = [

  ['Material estimation', 'Turn project dimensions and a part list into a considered material allowance.', '/estimator'],

  ['Furniture planning', 'Organize dimensions and components for common furniture and interior projects.', '/furniture'],

  ['Cutting optimization', 'Arrange rectangular parts on sheet stock and review the resulting layout.', '/optimizer'],

  ['Cost estimation', 'Add your own material rates to build a transparent, adjustable cost estimate.', '/estimator'],

  ['Quotation preparation', 'Bring project scope, material and costs together before preparing a client quotation.', '/estimator'],

  ['Project planning', 'Follow a clear path from measurements and material choices to the workshop.', '/about'],

]



const faqItems = [

  ['How should I use an estimate?', 'Treat it as a planning aid. Check the assumptions, dimensions, material specifications, waste allowance and local supplier rates before ordering or quoting.'],

  ['Can I browse materials without prices?', 'Yes. The material library describes common categories and intended uses. Commercial rates vary by supplier, grade, thickness and location, so they are not fixed in this demo.'],

  ['How are estimates priced?', 'The estimator can use a sheet rate that you enter. It does not include hardware, labour, finishing, transport or taxes unless you account for them separately.'],

  ['What measurements should I enter?', 'Use consistent units and finished outside dimensions. Confirm clearances, board thickness, joinery, back panels and site conditions before cutting.'],

  ['Does the cutting optimizer find the perfect layout?', 'No. It uses a simple shelf-packing heuristic to suggest a layout for rectangular parts. Compare the result with your workshop process and verify grain direction, saw kerf, defects and clamping requirements.'],

  ['Can I prepare a quotation?', 'Save an estimate to your account and create a linked quotation to view or print. PDF downloads and sending quotations to clients are not available yet.'],

  ['Can I create an account?', 'Yes. Create an account to access your profile and protected workspace features. Passwords are validated and securely hashed by Django.'],

]



const pageClass = 'sc-page mx-auto max-w-[1440px] px-6 py-16 sm:py-20 lg:px-10 lg:py-24'

const inputClass = 'sc-input'

const buttonClass = 'sc-button'

const secondaryButtonClass = 'sc-button sc-button-secondary'



function PageIntro({ eyebrow, title, description, children }) {

  return (

    <header className="sc-page-intro">

      <p className="sc-eyebrow">{eyebrow}</p>

      <h1>{title}</h1>

      <p className="sc-page-lede">{description}</p>

      {children}

    </header>

  )

}



function SectionHeading({ eyebrow, title, description }) {

  return (

    <div className="sc-section-heading">

      <p className="sc-eyebrow">{eyebrow}</p>

      <h2>{title}</h2>

      {description && <p>{description}</p>}

    </div>

  )

}



function FeatureRows({ items }) {

  return (

    <div className="sc-feature-rows">

      {items.map(([title, description], index) => (

        <article className="sc-feature-row" key={title}>

          <span className="sc-number">{String(index + 1).padStart(2, '0')}</span>

          <h3>{title}</h3>

          <p>{description}</p>

        </article>

      ))}

    </div>

  )

}



export function AboutPage() {

  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="About Smart Carpentry"

        title={<>Good builds begin<br />with a clear plan.</>}

        description="Smart Carpentry is a practical planning workspace for people who make furniture and shape interiors. It brings measurements, material decisions, cost planning and cutting preparation into one considered workflow."

      >

        <Link className={buttonClass} to="/services">Explore the services</Link>

      </PageIntro>



      <section className="sc-editorial-grid">

        <SectionHeading eyebrow="Our purpose" title="Make the work before the work count." />

        <div className="sc-editorial-copy">

          <p>In a workshop, a small measurement error can become a wasted sheet, a delayed build or a difficult conversation about cost. Better preparation helps teams make those decisions while changes are still easy.</p>

          <p>The product direction is grounded in craftsmanship: clearer dimensions, more deliberate material use, visible assumptions and cost control that supports the maker instead of getting in the way.</p>

        </div>

      </section>



      <section className="sc-page-section">

        <SectionHeading eyebrow="What guides the product" title="Precision, with the workshop in mind." />

        <FeatureRows items={[

          ['Precision', 'Keep dimensions and component requirements visible before production.'],

          ['Material efficiency', 'Plan sheet use and review offcuts before the saw is switched on.'],

          ['Cost control', 'Understand what a plan assumes and update rates to match your suppliers.'],

          ['Craftsmanship', 'Use digital planning to support experienced judgment and better making.'],

        ]} />

      </section>

      <p className="sc-process-line">Measure <span aria-hidden="true">-&gt;</span> Plan <span aria-hidden="true">-&gt;</span> Calculate <span aria-hidden="true">-&gt;</span> Optimize <span aria-hidden="true">-&gt;</span> Build</p>

    </main>

  )

}



export function ServicesPage() {

  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Services"

        title={<>From measurement<br />to material.</>}

        description="A set of connected planning tools for furniture makers, carpenters, interior teams and workshops. Start with the information you have; review every output before it reaches production."

      />

      <section className="sc-page-section">

        <div className="sc-card-grid">

          {serviceCatalog.map(([title, description, href], index) => (

            <article className="sc-service-card" key={title}>

              <span className="sc-number">{String(index + 1).padStart(2, '0')}</span>

              <h2>{title}</h2>

              <p>{description}</p>

              <Link to={href} className="sc-text-link">Explore {title.toLowerCase()} <span aria-hidden="true">-&gt;</span></Link>

            </article>

          ))}

        </div>

      </section>

      <div className="sc-inline-cta">

        <p>Know what you need before you build.</p>

        <Link className={buttonClass} to="/estimator">Open the estimator</Link>

      </div>

    </main>

  )

}



export function MaterialsPage() {

  const [query, setQuery] = useState('')

  const [category, setCategory] = useState('All materials')

  const categories = ['All materials', ...new Set(materialCatalog.map((material) => material[2]))]

  const filteredMaterials = useMemo(() => {

    const normalizedQuery = query.trim().toLowerCase()

    return materialCatalog.filter(([name, description, type]) => (

      (category === 'All materials' || category === type)

      && (!normalizedQuery || `${name} ${description}`.toLowerCase().includes(normalizedQuery))

    ))

  }, [category, query])



  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Material library"

        title={<>Choose materials<br />with context.</>}

        description="Browse common sheet goods, finishes, edge treatments and hardware. Specifications and availability vary between suppliers; this catalog deliberately does not publish fixed commercial prices."

      />

      <section className="sc-page-section">

        <div className="sc-catalog-controls">

          <label className="sc-field">

            <span>Search materials</span>

            <input className={inputClass} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try plywood or hardware" />

          </label>

          <label className="sc-field">

            <span>Category</span>

            <select className={inputClass} value={category} onChange={(event) => setCategory(event.target.value)}>

              {categories.map((item) => <option key={item}>{item}</option>)}

            </select>

          </label>

        </div>

        {filteredMaterials.length ? (

          <div className="sc-material-grid" aria-live="polite">

            {filteredMaterials.map(([name, description, type], index) => (

              <article className="sc-material-card" key={name}>

                <span className="sc-number">{String(index + 1).padStart(2, '0')}</span>

                <p className="sc-eyebrow">{type}</p>

                <h2>{name}</h2>

                <p>{description}</p>

                <span className="sc-material-note">Check grade, thickness and supplier specification</span>

              </article>

            ))}

          </div>

        ) : <p className="sc-empty-state">No materials match those filters. Try another search or category.</p>}

      </section>

      <p className="sc-note">Material descriptions are general guidance, not a specification for a particular supplier or project. Confirm suitability and rates before purchase.</p>

    </main>

  )

}



export function FurniturePage() {

  return (

    <main id="main-content">

      <div className="sc-page sc-furniture-intro mx-auto max-w-[1440px] px-6 lg:px-10">

        <PageIntro

          eyebrow="Furniture system"

          title={<>Plan the pieces<br />you build every day.</>}

          description="Explore the established furniture collection, then use the estimator to begin translating a project into material and cost assumptions."

        >

          <Link className={buttonClass} to="/estimator">Estimate a project</Link>

        </PageIntro>

      </div>

      <Furniture />

    </main>

  )

}



const defaultEstimate = {

  projectName: '',

  material: 'Plywood',

  width: '1200',

  height: '2100',

  depth: '600',

  shelves: '3',

  sheetWidth: '2440',

  sheetHeight: '1220',

  waste: '15',

  pricePerSheet: '',

}



function NumericField({ name, label, value, onChange, min = '1', max, step = '1', unit = 'mm' }) {

  return (

    <label className="sc-field">

      <span>{label} <small>({unit})</small></span>

      <input className={inputClass} type="number" inputMode="decimal" min={min} max={max} step={step} name={name} value={value} onChange={onChange} required />

    </label>

  )

}



export function EstimatorPage() {

  const [form, setForm] = useState(defaultEstimate)

  const [hasEstimated, setHasEstimated] = useState(false)

  const [error, setError] = useState('')

  const numbers = {

    width: Number(form.width),

    height: Number(form.height),

    depth: Number(form.depth),

    shelves: Number(form.shelves),

    sheetWidth: Number(form.sheetWidth),

    sheetHeight: Number(form.sheetHeight),

    waste: Number(form.waste),

    pricePerSheet: Number(form.pricePerSheet),

  }

  const validInputs = ['width', 'height', 'depth', 'sheetWidth', 'sheetHeight']

    .every((key) => Number.isFinite(numbers[key]) && numbers[key] > 0)

    && Number.isFinite(numbers.shelves) && numbers.shelves >= 0

    && Number.isFinite(numbers.waste) && numbers.waste >= 0 && numbers.waste <= 100

    && (!form.pricePerSheet || (Number.isFinite(numbers.pricePerSheet) && numbers.pricePerSheet >= 0))

  const sheetArea = numbers.sheetWidth * numbers.sheetHeight

  const projectArea = 2 * numbers.height * numbers.depth

    + 2 * numbers.width * numbers.depth

    + numbers.width * numbers.height

    + numbers.shelves * numbers.width * numbers.depth

  const rawSheetCount = Math.ceil(projectArea * (1 + numbers.waste / 100) / sheetArea)

  const rawEstimatedCost = rawSheetCount * numbers.pricePerSheet

  const valid = validInputs

    && Number.isFinite(sheetArea)

    && Number.isFinite(projectArea)

    && Number.isFinite(rawSheetCount)

    && (!form.pricePerSheet || Number.isFinite(rawEstimatedCost))

  const sheetsNeeded = valid ? rawSheetCount : 0

  const areaSquareMeters = projectArea / 1_000_000

  const estimatedCost = form.pricePerSheet && valid ? rawEstimatedCost : null

  const updateField = (event) => {

    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

    setHasEstimated(false)

    setError('')

  }



  const submitEstimate = (event) => {

    event.preventDefault()

    if (!valid) {

      setError('Enter positive dimensions and a waste allowance from 0 to 100%.')

      setHasEstimated(false)

      return

    }

    setHasEstimated(true)

    setError('')

  }



  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Smart estimator"

        title={<>Know the material<br />before you build.</>}

        description="Enter a simple cabinet envelope and a sheet size to get a transparent, editable planning estimate. It is a starting point, not a production cut list or final quotation."

      />

      <section className="sc-tool-layout sc-page-section">

        <form className="sc-tool-form" onSubmit={submitEstimate}>

          <h2>Project inputs</h2>

          <label className="sc-field">

            <span>Project name <small>(optional)</small></span>

            <input className={inputClass} name="projectName" value={form.projectName} onChange={updateField} maxLength="80" placeholder="e.g. Hallway cabinet" />

          </label>

          <label className="sc-field">

            <span>Primary sheet material</span>

            <select className={inputClass} name="material" value={form.material} onChange={updateField}>

              {['Plywood', 'MDF', 'Blockboard', 'Particle Board', 'Other'].map((material) => <option key={material}>{material}</option>)}

            </select>

          </label>

          <div className="sc-form-grid">

            <NumericField name="width" label="Overall width" value={form.width} onChange={updateField} />

            <NumericField name="height" label="Overall height" value={form.height} onChange={updateField} />

            <NumericField name="depth" label="Overall depth" value={form.depth} onChange={updateField} />

            <NumericField name="shelves" label="Internal shelves" unit="qty" value={form.shelves} min="0" max="100" onChange={updateField} />

          </div>

          <h3>Sheet assumptions</h3>

          <div className="sc-form-grid">

            <NumericField name="sheetWidth" label="Sheet width" value={form.sheetWidth} onChange={updateField} />

            <NumericField name="sheetHeight" label="Sheet height" value={form.sheetHeight} onChange={updateField} />

            <NumericField name="waste" label="Waste allowance" unit="%" value={form.waste} min="0" max="100" onChange={updateField} />

            <label className="sc-field">

              <span>Price per sheet <small>(optional)</small></span>

              <input className={inputClass} type="number" min="0" step="0.01" inputMode="decimal" name="pricePerSheet" value={form.pricePerSheet} onChange={updateField} placeholder="Enter your rate" />

            </label>

          </div>

          {error && <p className="sc-form-error" role="alert">{error}</p>}

          <button className={buttonClass} type="submit">Calculate estimate</button>

        </form>

        <aside className="sc-result-panel" aria-live="polite">

          <p className="sc-eyebrow">Planning result</p>

          <h2>{hasEstimated ? (form.projectName.trim() || 'Your project') : 'A clear starting point'}</h2>

          {hasEstimated ? (

            <>

              <dl className="sc-result-list">

                <div><dt>Panel area before waste</dt><dd>{areaSquareMeters.toFixed(2)} m²</dd></div>

                <div><dt>Estimated sheets</dt><dd>{sheetsNeeded}</dd></div>

                <div><dt>Primary material</dt><dd>{form.material}</dd></div>

                <div><dt>Waste allowance</dt><dd>{numbers.waste}%</dd></div>

                {estimatedCost !== null && <div><dt>Sheet material estimate</dt><dd>{estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</dd></div>}

              </dl>

              <p className="sc-note">Area model: two sides, top and bottom, one back panel and the number of shelves entered. Assumes one sheet material and does not optimize individual cuts.</p>

            </>

          ) : <p>Complete the inputs to see estimated panel area, a sheet-count allowance and—if you enter a rate—a material subtotal.</p>}

        </aside>

      </section>

      <p className="sc-note">This simplified model excludes doors, divisions, board thickness, grain direction, edge band, hardware, labour, finishing and delivery. Review all dimensions and include applicable allowances before ordering.</p>

    </main>

  )

}



const initialParts = [{ id: 1, name: 'Side panel', width: '700', height: '500', quantity: '2' }, { id: 2, name: 'Shelf', width: '600', height: '450', quantity: '3' }]



function optimizeParts(parts, sheetWidth, sheetHeight, kerf) {

  const expanded = parts.flatMap((part) => Array.from({ length: Number(part.quantity) }, (_, index) => ({

    name: part.name.trim() || 'Part',

    width: Number(part.width),

    height: Number(part.height),

    key: `${part.id}-${index}`,

  }))).sort((a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height))

  const sheets = []



  for (const part of expanded) {

    if (![part.width, part.height].every((dimension) => Number.isFinite(dimension) && dimension > 0)) {

      throw new Error('Each part needs positive width and height values.')

    }

    let placed = false

    for (const sheet of sheets) {

      for (const row of sheet.rows) {

        const nextX = row.usedWidth + kerf

        const fitsNormal = nextX + part.width <= sheetWidth

        const fitsRotated = nextX + part.height <= sheetWidth

        if (fitsNormal && part.height <= row.height) {

          row.parts.push({ ...part, x: nextX, y: row.y, width: part.width, height: part.height })
          row.usedWidth = nextX + part.width

          placed = true

          break

        }

        if (fitsRotated && part.width <= row.height) {

          row.parts.push({ ...part, x: nextX, y: row.y, width: part.height, height: part.width, rotated: true })
          row.usedWidth = nextX + part.height

          placed = true

          break

        }

      }

      if (placed) break

      const y = sheet.rows.reduce((sum, row) => sum + row.height + kerf, 0)

      const normalFits = part.height + y <= sheetHeight && part.width <= sheetWidth

      const rotatedFits = part.width + y <= sheetHeight && part.height <= sheetWidth

      if (normalFits || rotatedFits) {

        const rotated = !normalFits && rotatedFits

        const width = rotated ? part.height : part.width

        const height = rotated ? part.width : part.height

        sheet.rows.push({ y, height, usedWidth: width, parts: [{ ...part, x: 0, y, width, height, rotated }] })

        placed = true

        break

      }

    }

    if (!placed) {

      const normalFits = part.width <= sheetWidth && part.height <= sheetHeight

      const rotatedFits = part.height <= sheetWidth && part.width <= sheetHeight

      if (!normalFits && !rotatedFits) {

        throw new Error(`${part.name} cannot fit on the selected sheet, even when rotated.`)

      }

      const rotated = !normalFits && rotatedFits

      const width = rotated ? part.height : part.width

      const height = rotated ? part.width : part.height

      sheets.push({ rows: [{ y: 0, height, usedWidth: width, parts: [{ ...part, x: 0, y: 0, width, height, rotated }] }] })

    }

  }

  return sheets

}



function SheetLayout({ sheet, sheetWidth, sheetHeight, index }) {

  const colors = [

    'var(--sc-stone)',

    'var(--sc-stone-light)',

    'var(--sc-stone-dark)',

    'var(--sc-stone-lightest)',

  ]

  return (

    <div className="sc-sheet-layout">

      <h3>Sheet {index + 1}</h3>

      <div className="sc-sheet" style={{ aspectRatio: `${sheetWidth} / ${sheetHeight}` }} role="img" aria-label={`Suggested layout on sheet ${index + 1}`}>

        {sheet.rows.flatMap((row) => row.parts).map((part, partIndex) => (

          <div

            key={part.key}

            className="sc-sheet-part"

            style={{ left: `${part.x / sheetWidth * 100}%`, top: `${part.y / sheetHeight * 100}%`, width: `${part.width / sheetWidth * 100}%`, height: `${part.height / sheetHeight * 100}%`, backgroundColor: colors[partIndex % colors.length] }}
            title={`${part.name}: ${part.width} × ${part.height} mm${part.rotated ? ' (rotated)' : ''}`}

          >

            <span>{part.name}<small>{part.rotated ? 'Rotated · ' : ''}{part.width} × {part.height}</small></span>

          </div>

        ))}

      </div>

      <p className="sc-sheet-dimensions">{sheetWidth} × {sheetHeight} mm</p>

    </div>

  )

}



export function OptimizerPage() {

  const [parts, setParts] = useState(initialParts)

  const [sheetWidth, setSheetWidth] = useState('2440')

  const [sheetHeight, setSheetHeight] = useState('1220')

  const [kerf, setKerf] = useState('3')

  const [layouts, setLayouts] = useState(null)

  const [error, setError] = useState('')

  const [nextId, setNextId] = useState(3)



  const editPart = (id, key, value) => {

    setParts((current) => current.map((part) => part.id === id ? { ...part, [key]: value } : part))

    setLayouts(null)

    setError('')

  }

  const addPart = () => {

    setParts((current) => [...current, { id: nextId, name: '', width: '', height: '', quantity: '1' }])

    setNextId((current) => current + 1)

    setLayouts(null)

  }

  const calculateLayout = (event) => {

    event.preventDefault()

    const width = Number(sheetWidth)

    const height = Number(sheetHeight)

    const cutWidth = Number(kerf)

    if (![width, height, cutWidth].every(Number.isFinite) || !(width > 0 && height > 0 && cutWidth >= 0) || parts.some((part) => !(Number.isInteger(Number(part.quantity)) && Number(part.quantity) > 0 && Number(part.quantity) <= 200))) {

      setError('Enter positive sheet dimensions, a non-negative kerf and quantities from 1 to 200.')

      setLayouts(null)

      return

    }

    try {

      setLayouts(optimizeParts(parts, width, height, cutWidth))

      setError('')

    } catch (caughtError) {

      setError(caughtError.message)

      setLayouts(null)

    }

  }

  const usedArea = layouts?.reduce((total, sheet) => total + sheet.rows.flatMap((row) => row.parts).reduce((sum, part) => sum + part.width * part.height, 0), 0) ?? 0

  const sheetArea = Number(sheetWidth) * Number(sheetHeight)

  const utilization = layouts?.length && sheetArea > 0 ? usedArea / (layouts.length * sheetArea) * 100 : 0



  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Cutting optimizer"

        title={<>Plan the sheet<br />before the cut.</>}

        description="Enter rectangular parts, quantities, sheet dimensions and saw kerf to generate a practical layout suggestion. The heuristic is transparent and can be revised to match your workshop."

      />

      <section className="sc-optimizer-layout sc-page-section">

        <form className="sc-tool-form" onSubmit={calculateLayout}>

          <h2>Sheet and cut settings</h2>

          <div className="sc-form-grid">

            <NumericField name="sheet-width" label="Sheet width" value={sheetWidth} onChange={(event) => { setSheetWidth(event.target.value); setLayouts(null) }} />

            <NumericField name="sheet-height" label="Sheet height" value={sheetHeight} onChange={(event) => { setSheetHeight(event.target.value); setLayouts(null) }} />

            <NumericField name="kerf" label="Saw kerf" value={kerf} min="0" onChange={(event) => { setKerf(event.target.value); setLayouts(null) }} />

          </div>

          <h3>Parts</h3>

          {parts.map((part) => (

            <div className="sc-part-row" key={part.id}>

              <label className="sc-field"><span>Part name</span><input className={inputClass} value={part.name} onChange={(event) => editPart(part.id, 'name', event.target.value)} maxLength="60" placeholder="e.g. Shelf" /></label>

              <NumericField name={`part-width-${part.id}`} label="Width" value={part.width} onChange={(event) => editPart(part.id, 'width', event.target.value)} />

              <NumericField name={`part-height-${part.id}`} label="Height" value={part.height} onChange={(event) => editPart(part.id, 'height', event.target.value)} />

              <NumericField name={`part-quantity-${part.id}`} label="Qty" unit="pieces" value={part.quantity} min="1" max="200" onChange={(event) => editPart(part.id, 'quantity', event.target.value)} />

              <button className="sc-remove-button" type="button" onClick={() => { setParts((current) => current.filter((item) => item.id !== part.id)); setLayouts(null) }} aria-label={`Remove ${part.name || 'unnamed part'}`} disabled={parts.length === 1}>Remove</button>

            </div>

          ))}

          <div className="sc-form-actions">

            <button className={secondaryButtonClass} type="button" onClick={addPart}>Add a part</button>

            <button className={buttonClass} type="submit">Generate layout</button>

          </div>

          {error && <p className="sc-form-error" role="alert">{error}</p>}

        </form>

      </section>

      {layouts && (

        <section className="sc-page-section" aria-live="polite">

          <SectionHeading eyebrow="Suggested layout" title={`${layouts.length} sheet${layouts.length === 1 ? '' : 's'} in this plan`} description={`Approximate part-area utilization: ${utilization.toFixed(1)}%. This is a heuristic arrangement, not a guaranteed minimum-sheet solution.`} />

          <div className="sc-layout-grid">

            {layouts.map((sheet, index) => <SheetLayout key={index} sheet={sheet} sheetWidth={Number(sheetWidth)} sheetHeight={Number(sheetHeight)} index={index} />)}

          </div>

        </section>

      )}

      <p className="sc-note">Layout uses a simple shelf-packing heuristic with optional rotation. Verify grain direction, defects, clamps, trimming, actual blade kerf and safe cutting sequence; displayed layouts are planning aids only.</p>

    </main>

  )

}



export function PricingPage() {

  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Pricing"

        title={<>Clear costs start<br />with clear inputs.</>}

        description="Material rates and project costs depend on supplier, specification and scope. Smart Carpentry does not publish a fixed commercial price list or claim subscription prices in this demo."

      />

      <section className="sc-editorial-grid">

        <SectionHeading eyebrow="Estimate with your rates" title="Use the prices you actually buy at." />

        <div className="sc-editorial-copy">

          <p>Try the estimator by entering your own sheet rate. Its result shows the assumptions and limited scope so you can decide what still needs to be added for a complete project cost.</p>

          <p>For product access or business pricing, use the contact page to describe your intended workflow. No plan, payment or availability claims are implied here.</p>

          <div className="sc-form-actions"><Link className={buttonClass} to="/estimator">Open estimator</Link><Link className={secondaryButtonClass} to="/contact">Contact us</Link></div>

        </div>

      </section>

    </main>

  )

}



export function FaqPage() {

  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Frequently asked questions"

        title={<>Good planning.<br />Clear expectations.</>}

        description="Answers about planning estimates, materials, measurements and the limits of the current frontend tools."

      />

      <section className="sc-faq-list sc-page-section">

        {faqItems.map(([question, answer]) => (

          <details className="sc-faq-item" key={question}>

            <summary>{question}<span aria-hidden="true">+</span></summary>

            <p>{answer}</p>

          </details>

        ))}

      </section>

      <div className="sc-inline-cta"><p>Still have a question about your workflow?</p><Link className={buttonClass} to="/contact">Get in touch</Link></div>

    </main>

  )

}



export function ContactPage() {

  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({ name: '', email: '', topic: 'General enquiry', message: '' })

  const [error, setError] = useState('')

  const submitContact = (event) => {

    event.preventDefault()

    if (!event.currentTarget.reportValidity()) return

    if (form.message.trim().length < 10) {

      setError('Please add a little more detail (at least 10 characters).')

      setSubmitted(false)

      return

    }

    setError('')

    setSubmitted(true)

  }



  return (

    <main id="main-content" className={pageClass}>

      <PageIntro

        eyebrow="Contact"

        title={<>Tell us what<br />you are planning.</>}

        description="Share a little about your workshop, project or product question. The form validates your message locally; this demo does not send or save submissions."

      />

      <section className="sc-contact-layout sc-page-section">

        <form className="sc-tool-form" onSubmit={submitContact}>

          <h2>Send an enquiry</h2>

          <label className="sc-field"><span>Name</span><input className={inputClass} name="name" required maxLength="100" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>

          <label className="sc-field"><span>Email</span><input className={inputClass} name="email" type="email" required maxLength="254" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>

          <label className="sc-field"><span>Topic</span><select className={inputClass} name="topic" value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })}><option>General enquiry</option><option>Product access</option><option>Materials and estimation</option><option>Partnership</option></select></label>

          <label className="sc-field"><span>Message</span><textarea className={inputClass} name="message" required minLength="10" maxLength="3000" rows="6" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>

          {error && <p className="sc-form-error" role="alert">{error}</p>}

          {submitted && <p className="sc-form-status" role="status">Your message passed validation. It has not been sent because a contact service is not connected yet.</p>}

          <button className={buttonClass} type="submit">Validate message</button>

        </form>

        <aside className="sc-contact-note">

          <p className="sc-eyebrow">Before you write</p>

          <h2>Useful details help.</h2>

          <p>For a product question, mention the tool and what you were trying to do. For project planning, include the type of work and the measurements or material questions you are working through.</p>

          <Link className="sc-text-link" to="/faq">Read frequently asked questions <span aria-hidden="true">-&gt;</span></Link>

        </aside>

      </section>

    </main>

  )

}



function AuthPage({ register = false }) {

  const { user, loading, login, register: createAccount } = useAuth()

  const location = useLocation()

  const navigate = useNavigate()

  const [status, setStatus] = useState('')

  const [error, setError] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const [password, setPassword] = useState('')

  const [confirmation, setConfirmation] = useState('')

  const [passwordErrors, setPasswordErrors] = useState([])

  const onSubmit = async (event) => {

    event.preventDefault()

    setStatus('')

    setError('')

    setPasswordErrors([])

    if (register && password !== confirmation) {

      setError('Passwords do not match.')

      return

    }

    setSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const payload = register

      ? {

          email: formData.get('email'),

          password,

          first_name: formData.get('first_name'),

          last_name: formData.get('last_name'),

        }

      : {

          email: formData.get('email'),

          password,

        }

    try {

      if (register) {

        await createAccount(payload)

        navigate('/verify-email', {

          replace: true,

          state: {

            email: payload.email,

          },

        })

      } else {

        await login(payload.email, password)

        navigate(location.state?.from || '/dashboard', {

          replace: true,

        })

      }

    } catch (requestError) {

      const responseData = requestError.response?.data

      if (responseData?.password) {

        setPasswordErrors(responseData.password)

      } else if (responseData?.email) {

        setError(responseData.email.join(' '))

      } else {

        setError(

          responseData?.detail ||

            'Authentication could not be completed. Check your connection and try again.',

        )

      }

    } finally {

      setSubmitting(false)

    }

  }



  if (loading) {

    return <main className={pageClass} aria-live="polite">Checking your session…</main>

  }

  if (user) {

    return <Navigate to={location.state?.from || '/dashboard'} replace />

  }



  return (

    <main id="main-content" className={`${pageClass} sc-auth-page`}>

      <PageIntro

        eyebrow={register ? 'Create account' : 'Welcome back'}

        title={register ? <>Make room<br />for better planning.</> : <>Sign in to<br />your workspace.</>}

        description={register ? 'Create your account to keep your planning workspace details together.' : 'Sign in to your Smart Carpentry workspace.'}

      />

      <form className="sc-tool-form sc-auth-form" onSubmit={onSubmit} aria-busy={submitting}>

        {register && (

          <div className="sc-auth-name-row">

            <label className="sc-field"><span>First name</span><input className={inputClass} name="first_name" required autoComplete="given-name" maxLength="150" /></label>

            <label className="sc-field"><span>Last name</span><input className={inputClass} name="last_name" autoComplete="family-name" maxLength="150" /></label>

          </div>

        )}

        <label className="sc-field"><span>Email</span><input className={inputClass} name="email" required type="email" autoComplete="email" maxLength="254" /></label>

        <label className="sc-field"><span>Password</span><input className={inputClass} name="password" required type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength="8" value={password} onChange={(event) => setPassword(event.target.value)} /></label>

        {register && <label className="sc-field"><span>Confirm password</span><input className={inputClass} name="passwordConfirmation" required type="password" autoComplete="new-password" minLength="8" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></label>}

        {status && <p className="sc-form-status" role="status">{status}</p>}

        {error && <p className="sc-form-status" role="alert">{error}</p>}

        {passwordErrors.length > 0 && <ul className="sc-form-status" role="alert">{passwordErrors.map((message) => <li key={message}>{message}</li>)}</ul>}

        <button className={buttonClass} type="submit" disabled={submitting}>{submitting ? 'Please wait…' : register ? 'Create account' : 'Sign in'}</button>

        <p className="sc-auth-switch">{register ? 'Already have an account?' : 'New to Smart Carpentry?'} <Link className="sc-text-link" to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link></p>

      </form>

    </main>

  )

}



export function LoginPage() {

  return <AuthPage />

}



export function RegisterPage() {

  return <AuthPage register />

}

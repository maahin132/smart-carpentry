    import { useEffect, useState } from 'react'
    import { AnimatePresence, motion } from 'framer-motion'
    import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
    import { useAuth } from '../../auth/useAuth'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Materials', to: '/materials' },
  { label: 'Furniture', to: '/furniture' },
  { label: 'Estimator', to: '/estimator' },
  { label: 'Optimizer', to: '/optimizer' },
  { label: 'Pricing', to: '/pricing' },
]

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [accountError, setAccountError] = useState('')
  const [darkMode, setDarkMode] = useState(
    () =>
      typeof window !== 'undefined' &&
      localStorage.getItem('smart-carpentry-theme') === 'dark',
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const toggleTheme = () => {
    const nextTheme = !darkMode

    setDarkMode(nextTheme)

    localStorage.setItem(
      'smart-carpentry-theme',
      nextTheme ? 'dark' : 'light',
    )
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const handleLogout = async () => {
    setAccountError('')
    try {
      await logout()
      closeMobileMenu()
      navigate('/', { replace: true })
    } catch {
      setAccountError('Could not sign out. Please try again.')
    }
  }

  const accountLinks = user ? (
    <>
      <Link to="/settings" onClick={closeMobileMenu} className="text-xs uppercase tracking-[0.1em] text-[var(--sc-muted)] hover:text-[var(--sc-text)]">
        {user.first_name || 'Account'}
      </Link>
      <button type="button" onClick={handleLogout} className="text-xs uppercase tracking-[0.1em] text-[var(--sc-muted)] hover:text-[var(--sc-text)]">
        Sign out
      </button>
    </>
  ) : (
    <>
      <Link to="/login" onClick={closeMobileMenu} className="text-xs uppercase tracking-[0.1em] text-[var(--sc-muted)] hover:text-[var(--sc-text)]">
        Sign in
      </Link>
      <Link to="/register" onClick={closeMobileMenu} className="text-xs uppercase tracking-[0.1em] text-[var(--sc-muted)] hover:text-[var(--sc-text)]">
        Create account
      </Link>
    </>
  )

  return (
    <header className={`sc-navbar sticky top-0 z-50 border-b bg-[var(--sc-navy)]/95 transition-[border-color,box-shadow,background-color] duration-300 ${
      scrolled
        ? 'border-[var(--sc-border-light)]/70 shadow-[0_14px_38px_rgba(0,0,0,0.2)] backdrop-blur-xl'
        : 'border-[var(--sc-border)]'
    }`}>
      <nav
        className="mx-auto flex h-[82px] max-w-[1536px] items-center justify-between gap-5 px-6 lg:px-10"
        aria-label="Primary navigation"
      >
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-crimson-soft)]"
          onClick={closeMobileMenu}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--sc-crimson)] text-xs font-bold tracking-[0.08em] text-[var(--sc-text-light)] shadow-[0_5px_18px_rgba(180,35,50,0.22)] transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
            SC
          </span>

          <span className="block">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--sc-text)] sm:text-[13px] sm:tracking-[0.15em]">
              Smart Carpentry
            </span>

            <span className="mt-1 hidden text-[10px] tracking-[0.1em] text-[var(--sc-muted)] sm:block">
              Precision. Material. Build.
            </span>
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-[var(--sc-border-light)] bg-[var(--sc-navy-surface)]/55 p-1 xl:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              aria-current={location.pathname === item.to ? 'page' : undefined}
              className={({ isActive }) => `relative whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.11em] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sc-crimson-soft)] ${
                isActive
                  ? 'bg-[var(--sc-navy-surface-soft)] text-[var(--sc-text-light)] shadow-sm'
                  : 'text-[var(--sc-muted)] hover:bg-[var(--sc-navy-surface)] hover:text-[var(--sc-text-light)]'
              }`}
            >
              {location.pathname === item.to && (
                <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--sc-crimson-soft)] align-middle" />
              )}
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <div className="flex items-center gap-3 border-r border-[var(--sc-border-light)] pr-4 [&_a]:rounded-sm [&_a]:text-[10px] [&_a]:font-medium [&_a]:uppercase [&_a]:tracking-[0.1em] [&_a]:transition-colors [&_a]:duration-200 [&_a]:hover:text-[var(--sc-text-light)] [&_button]:rounded-sm [&_button]:text-[10px] [&_button]:font-medium [&_button]:uppercase [&_button]:tracking-[0.1em] [&_button]:transition-colors [&_button]:duration-200 [&_button]:hover:text-[var(--sc-text-light)]">
            {accountLinks}
          </div>
          {accountError && <span className="text-xs text-[var(--sc-accent)]" role="alert">{accountError}</span>}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sc-border-light)] text-[var(--sc-text)] transition duration-200 hover:border-[var(--sc-crimson-soft)] hover:bg-[var(--sc-navy-surface)] hover:text-[var(--sc-crimson-soft)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--sc-accent)]"
          >
            {darkMode ? (
              <span className="text-sm">☼</span>
            ) : (
              <span className="text-sm">◐</span>
            )}
          </button>

          <Link
            to={user ? '/dashboard' : '/estimator'}
            className="rounded-full bg-[var(--sc-crimson)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sc-text-light)] shadow-[0_6px_20px_rgba(180,35,50,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--sc-crimson-dark)] hover:shadow-[0_9px_24px_rgba(180,35,50,0.26)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--sc-crimson-soft)] focus:ring-offset-2 focus:ring-offset-[var(--sc-navy)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sc-border)] text-[var(--sc-text)] transition duration-200 hover:border-[var(--sc-accent)] hover:text-[var(--sc-accent)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--sc-accent)]"
          >
            {darkMode ? '☼' : '◐'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-navigation"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-[var(--sc-border)] transition duration-200 hover:border-[var(--sc-accent)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--sc-accent)]"
          >
            <span
              className={`h-px w-4 bg-[var(--sc-text)] transition ${
                mobileOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />

            <span
              className={`h-px w-4 bg-[var(--sc-text)] transition ${
                mobileOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
        <motion.div
          id="mobile-primary-navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="border-t border-[var(--sc-border)] bg-[var(--sc-navy)] xl:hidden"
        >
          <div className="mx-auto max-w-[1440px] px-6 py-5">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-5 border-b border-[var(--sc-border)] py-4">
                {accountLinks}
              </div>
              {navigation.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `border-b border-[var(--sc-border)] py-4 text-xs uppercase tracking-[0.16em] transition ${
                    isActive ? 'text-[var(--sc-accent)]' : 'text-[var(--sc-text)] hover:translate-x-1 hover:text-[var(--sc-accent)]'
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-5 flex gap-3">
                <Link
                  to={user ? '/dashboard' : '/estimator'}
                  onClick={closeMobileMenu}
                  className="flex-1 rounded-[6px] bg-[var(--sc-crimson)] px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--sc-text-light)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--sc-crimson-dark)] active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
              {accountError && <p className="mt-3 text-sm text-[var(--sc-accent)]" role="alert">{accountError}</p>}
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
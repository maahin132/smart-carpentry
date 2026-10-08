import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/navigation/Navbar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './pages/Home'
import SettingsPage from './pages/SettingsPage'
import { AuthProvider } from './auth/AuthContext'
import Footer from './components/layout/Footer/Footer'
import VerifyEmailPage from './pages/VerifyEmailPage'
import {
  AboutPage,
  ContactPage,
  EstimatorPage,
  FaqPage,
  FurniturePage,
  LoginPage,
  MaterialsPage,
  OptimizerPage,
  PricingPage,
  RegisterPage,
  ServicesPage,
} from './pages/PublicPages'
import {
  AdminRedirect,
  DashboardPage,
  EstimateDetailPage,
  EstimatesPage,
  CuttingPlanDetailPage,
  CuttingPlansPage,
  ProfilePage,
  QuotationCreatePage,
  QuotationDetailPage,
  QuotationsPage,
} from './pages/WorkspacePages'

const routeMetadata = {
  '/': [
    'Smart Carpentry — Plan the material before you build',
    'Plan furniture, estimate materials and prepare for the cut with Smart Carpentry.',
  ],
  '/about': [
    'About — Smart Carpentry',
    'Learn how Smart Carpentry supports precision, material efficiency, cost control and craftsmanship.',
  ],
  '/services': [
    'Services — Smart Carpentry',
    'Explore material estimation, furniture planning, cutting optimization and project planning tools.',
  ],
  '/materials': [
    'Materials — Smart Carpentry',
    'Browse common sheet materials, finishes, edge band and hardware categories.',
  ],
  '/furniture': [
    'Furniture — Smart Carpentry',
    'Explore furniture systems and plan the material before you build.',
  ],
  '/estimator': [
    'Smart Estimator — Smart Carpentry',
    'Create a transparent, editable planning estimate from project dimensions and your own material rate.',
  ],
  '/optimizer': [
    'Cutting Optimizer — Smart Carpentry',
    'Arrange rectangular parts on sheet stock and review a suggested cutting layout.',
  ],
  '/pricing': [
    'Pricing — Smart Carpentry',
    'Learn how to use your supplier rates with Smart Carpentry estimates.',
  ],
  '/faq': [
    'FAQ — Smart Carpentry',
    'Answers about estimates, materials, measurements, cutting plans and accounts.',
  ],
  '/contact': [
    'Contact — Smart Carpentry',
    'Contact Smart Carpentry with a question about your project or workflow.',
  ],
  '/login': [
    'Sign in — Smart Carpentry',
    'Sign in to your Smart Carpentry workspace.',
  ],
  '/register': [
    'Create account — Smart Carpentry',
    'Create a Smart Carpentry account to save your workspace details.',
  ],
  '/verify-email': [
    'Verify email — Smart Carpentry',
    'Verify your Smart Carpentry email address to activate your account.',
  ],
  '/settings': [
    'Account settings — Smart Carpentry',
    'View and update your Smart Carpentry profile.',
  ],
  '/dashboard': [
    'Workspace — Smart Carpentry',
    'Manage estimates, cutting plans, quotations and account settings.',
  ],
  '/estimates': [
    'My estimates — Smart Carpentry',
    'Review estimates saved to your Smart Carpentry account.',
  ],
  '/cutting-plans': [
    'Cutting plans — Smart Carpentry',
    'Review sheet layouts saved to your Smart Carpentry account.',
  ],
  '/quotations': [
    'Quotations — Smart Carpentry',
    'Review quotations saved to your Smart Carpentry account.',
  ],
  '/profile': [
    'Profile — Smart Carpentry',
    'View your Smart Carpentry account information.',
  ],
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const [title, description] =
      routeMetadata[pathname] ?? routeMetadata['/']

    document.title = title

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [pathname])

  return null
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--sc-bg)] text-[var(--sc-text)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[6px] focus:bg-[var(--sc-navy)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[var(--sc-text-light)]"
        >
          Skip to content
        </a>

        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />

            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/about" element={<AboutPage />} />

              <Route path="/services" element={<ServicesPage />} />

              <Route path="/materials" element={<MaterialsPage />} />

              <Route path="/furniture" element={<FurniturePage />} />

              <Route path="/estimator" element={<EstimatorPage />} />

              <Route path="/optimizer" element={<OptimizerPage />} />

              <Route path="/pricing" element={<PricingPage />} />

              <Route path="/faq" element={<FaqPage />} />

              <Route path="/contact" element={<ContactPage />} />

              <Route path="/login" element={<LoginPage />} />

              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/verify-email"
                element={<VerifyEmailPage />}
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/estimates"
                element={
                  <ProtectedRoute>
                    <EstimatesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/estimates/new"
                element={
                  <ProtectedRoute>
                    <EstimatorPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/estimates/:id"
                element={
                  <ProtectedRoute>
                    <EstimateDetailPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cutting-plans"
                element={
                  <ProtectedRoute>
                    <CuttingPlansPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cutting-plans/:id"
                element={
                  <ProtectedRoute>
                    <CuttingPlanDetailPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/quotations"
                element={
                  <ProtectedRoute>
                    <QuotationsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/quotations/new"
                element={
                  <ProtectedRoute>
                    <QuotationCreatePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/quotations/:id"
                element={
                  <ProtectedRoute>
                    <QuotationDetailPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={
                  <main
                    id="main-content"
                    className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-24 lg:px-10"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
                      Page not found
                    </p>

                    <h1 className="mt-4 text-4xl font-medium text-[var(--sc-text)]">
                      That page isn’t here.
                    </h1>

                    <div className="mt-6 flex flex-wrap gap-5">
                      <Link
                        className="text-sm text-[var(--sc-accent)] underline"
                        to="/"
                      >
                        Back home
                      </Link>

                      <Link
                        className="text-sm text-[var(--sc-accent)] underline"
                        to="/dashboard"
                      >
                        Go to dashboard
                      </Link>
                    </div>
                  </main>
                }
              />
            </Routes>

            <Footer />
          </AuthProvider>
        </BrowserRouter>
      </div>
    </MotionConfig>
  )
}

export default App
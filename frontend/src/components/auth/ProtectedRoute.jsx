import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'

function ProtectedRoute({ children }) {
  const { user, loading, sessionError, refreshUser } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-24 lg:px-10" aria-live="polite">
        Checking your session…
      </main>
    )
  }

  if (sessionError) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-24 lg:px-10">
        <p role="alert">{sessionError}</p>
        <button className="sc-button mt-5" type="button" onClick={refreshUser}>
          Try again
        </button>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute

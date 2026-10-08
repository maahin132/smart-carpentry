import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const pageClass = 'mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24'

const inputClass =
  'w-full border border-[var(--sc-border)] bg-[var(--sc-surface)] px-4 py-3 text-sm text-[var(--sc-text)] outline-none transition focus:border-[var(--sc-accent)]'

const buttonClass =
  'inline-flex min-h-12 items-center justify-center border border-[var(--sc-accent)] bg-[var(--sc-accent)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'

export default function VerifyEmailPage() {
  const { verifyEmail, resendOTP, user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const initialEmail = location.state?.email || ''

  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setCooldown((current) => Math.max(current - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [cooldown])

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, loading, navigate])

  const formattedCooldown = useMemo(() => {
    if (cooldown <= 0) {
      return ''
    }

    return `${cooldown}s`
  }, [cooldown])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setStatus('')

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedOTP = otp.trim()

    if (!normalizedEmail) {
      setError('Enter the email address you used to register.')
      return
    }

    if (!/^\d{6}$/.test(normalizedOTP)) {
      setError('Enter the 6-digit verification code.')
      return
    }

    setSubmitting(true)

    try {
      await verifyEmail(normalizedEmail, normalizedOTP)

      setStatus('Email verified successfully.')

      window.setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: {
            email: normalizedEmail,
            verified: true,
          },
        })
      }, 700)
    } catch (requestError) {
      const responseData = requestError.response?.data

      setError(
        responseData?.detail ||
          'Email verification could not be completed. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setStatus('')

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Enter the email address used to register first.')
      return
    }

    if (cooldown > 0) {
      return
    }

    setResending(true)

    try {
      const response = await resendOTP(normalizedEmail)

      setStatus(
        response?.detail ||
          'A new verification code has been sent to your email address.',
      )

      setCooldown(60)
      setOtp('')
    } catch (requestError) {
      const responseData = requestError.response?.data

      setError(
        responseData?.detail ||
          'Unable to resend the verification code right now.',
      )

      if (requestError.response?.status === 429) {
        setCooldown(60)
      }
    } finally {
      setResending(false)
    }
  }

  if (loading) {
    return (
      <main className={pageClass} aria-live="polite">
        Checking your session…
      </main>
    )
  }

  if (user) {
    return null
  }

  return (
    <main
      id="main-content"
      className={`${pageClass} sc-auth-page`}
    >
      <div className="sc-page-intro">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--sc-accent)]">
          Verify email
        </p>

        <h1 className="mt-4 text-4xl font-medium tracking-tight text-[var(--sc-text)] lg:text-6xl">
          Confirm your
          <br />
          email address.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--sc-muted)]">
          Enter the 6-digit verification code we sent to your registered
          email address.
        </p>
      </div>

      <form
        className="sc-tool-form sc-auth-form"
        onSubmit={handleSubmit}
        aria-busy={submitting || resending}
      >
        <label className="sc-field">
          <span>Email</span>

          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>

        <label className="sc-field">
          <span>Verification code</span>

          <input
            className={`${inputClass} tracking-[0.35em]`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, '')
              setOtp(value)
            }}
            autoComplete="one-time-code"
            placeholder="000000"
            required
          />

          <small>
            The verification code is valid for 10 minutes.
          </small>
        </label>

        {status && (
          <p className="sc-form-status" role="status">
            {status}
          </p>
        )}

        {error && (
          <p className="sc-form-status" role="alert">
            {error}
          </p>
        )}

        <button
          className={buttonClass}
          type="submit"
          disabled={submitting || resending}
        >
          {submitting ? 'Verifying…' : 'Verify email'}
        </button>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            className="text-sm text-[var(--sc-accent)] underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleResend}
            disabled={submitting || resending || cooldown > 0}
          >
            {resending
              ? 'Sending…'
              : cooldown > 0
                ? `Resend code in ${formattedCooldown}`
                : 'Resend code'}
          </button>

          <Link
            className="text-sm text-[var(--sc-muted)] underline underline-offset-4 transition hover:text-[var(--sc-text)]"
            to="/login"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </main>
  )
}
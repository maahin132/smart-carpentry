import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { patchWithCsrf, postWithCsrf } from '../auth/api'
import '../styles/public-pages.css'

const pageClass = 'sc-page mx-auto max-w-[1440px] px-6 py-16 sm:py-20 lg:px-10 lg:py-24'

function SettingsPage() {
  const { user, refreshUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      await patchWithCsrf('/users/me/', Object.fromEntries(form))
      await refreshUser()
      setMessage('Your profile has been updated.')
    } catch (requestError) {
      setError(
        requestError.response?.data?.detail ||
          'Your profile could not be saved. Check your connection and try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    setChangingPassword(true)
    setPasswordMessage('')
    setPasswordError('')
    const form = new FormData(event.currentTarget)
    const currentPassword = form.get('current_password')
    const newPassword = form.get('new_password')
    if (newPassword !== form.get('confirm_password')) {
      setPasswordError('New passwords do not match.')
      setChangingPassword(false)
      return
    }
    try {
      await postWithCsrf('/auth/password/change/', {
        current_password: currentPassword,
        new_password: newPassword,
      })
      formElement.reset()
      setPasswordMessage('Your password has been updated.')
    } catch (requestError) {
      const data = requestError.response?.data
      setPasswordError(
        data?.current_password?.join(' ') ||
          data?.new_password?.join(' ') ||
          data?.detail ||
          'Your password could not be changed. Check your connection and try again.',
      )
    } finally {
      setChangingPassword(false)
    }
  }

  return (
    <main id="main-content" className={`${pageClass} sc-settings-page`}>
      <header className="sc-page-intro">
        <Link className="sc-text-link mb-6" to="/dashboard">← Dashboard</Link>
        <p className="sc-eyebrow">Account settings</p>
        <h1>Your workspace,<br />your details.</h1>
        <p className="sc-page-lede">Update the profile information attached to your Smart Carpentry account.</p>
      </header>

      <form className="sc-tool-form sc-settings-form" onSubmit={submit}>
        <label className="sc-field">
          <span>Email</span>
          <input className="sc-input" type="email" value={user.email} readOnly />
          <small>Email changes are not available here.</small>
        </label>
        <label className="sc-field">
          <span>First name</span>
          <input className="sc-input" name="first_name" autoComplete="given-name" maxLength="150" defaultValue={user.first_name} />
        </label>
        <label className="sc-field">
          <span>Last name</span>
          <input className="sc-input" name="last_name" autoComplete="family-name" maxLength="150" defaultValue={user.last_name} />
        </label>
        <label className="sc-field">
          <span>Phone number</span>
          <input className="sc-input" name="phone_number" autoComplete="tel" maxLength="32" defaultValue={user.phone_number} />
        </label>
        <label className="sc-field">
          <span>Organization</span>
          <input className="sc-input" name="organization" autoComplete="organization" maxLength="160" defaultValue={user.organization} />
        </label>
        <p className="sc-field">
          <span>Account type</span>
          <span>{user.role === 'admin' ? 'Administrator' : 'Standard user'}</span>
        </p>
        {message && <p className="sc-form-status" role="status">{message}</p>}
        {error && <p className="sc-form-status" role="alert">{error}</p>}
        <button className="sc-button" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </form>

      <section className="sc-settings-password">
        <header className="sc-section-heading">
          <p className="sc-eyebrow">Security</p>
          <h2>Change your password</h2>
          <p>Use your current password to set a new one.</p>
        </header>
        <form className="sc-tool-form sc-settings-form" onSubmit={changePassword} aria-busy={changingPassword}>
          <label className="sc-field">
            <span>Current password</span>
            <input className="sc-input" name="current_password" type="password" autoComplete="current-password" required />
          </label>
          <label className="sc-field">
            <span>New password</span>
            <input className="sc-input" name="new_password" type="password" autoComplete="new-password" minLength="8" required />
          </label>
          <label className="sc-field">
            <span>Confirm new password</span>
            <input className="sc-input" name="confirm_password" type="password" autoComplete="new-password" minLength="8" required />
          </label>
          {passwordMessage && <p className="sc-form-status" role="status">{passwordMessage}</p>}
          {passwordError && <p className="sc-form-status" role="alert">{passwordError}</p>}
          <button className="sc-button" type="submit" disabled={changingPassword}>
            {changingPassword ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default SettingsPage

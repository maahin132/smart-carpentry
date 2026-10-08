import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, postWithCsrf } from './api'
import { AuthContext } from './context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessionError, setSessionError] = useState('')

  const loadCurrentUser = useCallback(async () => {
    try {
      const response = await api.get('/users/me/')
      setUser(response.data)
      return response.data
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setUser(null)
        return null
      }

      setUser(null)
      setSessionError(
        'Could not verify your session. Check your connection and try again.',
      )

      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    setLoading(true)
    setSessionError('')
    return loadCurrentUser()
  }, [loadCurrentUser])

  useEffect(() => {
    let active = true

    api.get('/users/me/')
      .then((response) => {
        if (active) {
          setUser(response.data)
        }
      })
      .catch((error) => {
        if (!active) return

        setUser(null)

        if (
          error.response?.status !== 401 &&
          error.response?.status !== 403
        ) {
          setSessionError(
            'Could not verify your session. Check your connection and try again.',
          )
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const response = await postWithCsrf('/auth/login/', {
      email,
      password,
    })

    setUser(response.data.user)
    setSessionError('')

    return response.data.user
  }, [])

  const register = useCallback(async (details) => {
    const response = await postWithCsrf('/auth/register/', details)

    return response.data
  }, [])

  const verifyEmail = useCallback(async (email, otp) => {
    const response = await postWithCsrf('/auth/verify-email/', {
      email,
      otp,
    })

    return response.data
  }, [])

  const resendOTP = useCallback(async (email) => {
    const response = await postWithCsrf('/auth/resend-otp/', {
      email,
    })

    return response.data
  }, [])

  const logout = useCallback(async () => {
    await postWithCsrf('/auth/logout/')
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      sessionError,
      refreshUser,
      login,
      register,
      verifyEmail,
      resendOTP,
      logout,
    }),
    [
      user,
      loading,
      sessionError,
      refreshUser,
      login,
      register,
      verifyEmail,
      resendOTP,
      logout,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
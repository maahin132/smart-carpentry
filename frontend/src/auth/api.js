import axios from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  `${window.location.protocol}//${window.location.hostname}:8000/api/v1`

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { Accept: 'application/json' },
})

export async function requestWithCsrf(method, path, data = {}) {
  const { data: csrfData } = await api.get('/auth/csrf/')
  return api.request({
    method,
    url: path,
    data,
    headers: { 'X-CSRFToken': csrfData.csrfToken },
  })
}

export function postWithCsrf(path, data = {}) {
  return requestWithCsrf('post', path, data)
}

export function patchWithCsrf(path, data = {}) {
  return requestWithCsrf('patch', path, data)
}

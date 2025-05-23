// src/api/api.js
// src/lib/api.js (por ejemplo)
export const API_BASE = (
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'http://localhost:4000'
);

/**
 * Helper para ejecutar fetch, con headers comunes y opcional credenciales.
 */
async function request(endpoint, { method, data = null, token = null } = {}) {
  // aseguramos que endpoint empiece con slash
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`

  const headers = {}
  if (data) headers['Content-Type'] = 'application/json'
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(url, {
    method,
    headers,
    // para que el navegador envíe y acepte cookies/sesiones
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${method} ${endpoint} failed (${res.status}): ${text}`)
  }

  // si no hay cuerpo, retorna null
  return res.status !== 204 ? res.json() : null
}

/**
 * GET: /api/whatever
 */
export function getData(endpoint, token = null) {
  return request(endpoint, { method: 'GET', token })
}

/**
 * POST: /api/whatever
 */
export function postData(endpoint, data, token = null) {
  return request(endpoint, { method: 'POST', data, token })
}

/**
 * PUT: /api/whatever
 */
export function putData(endpoint, data, token = null) {
  return request(endpoint, { method: 'PUT', data, token })
}

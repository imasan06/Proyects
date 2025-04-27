// src/api/api.js

export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-production-bf4a.up.railway.app/"

/**
 * GET: realiza una solicitud GET a API_BASE + endpoint
 * @param {string} endpoint — p.ej. "/improvement/123"
 * @param {string|null} token — JWT si corresponde
 */
export async function getData(endpoint, token = null) {
  try {
    const headers = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("GET Error:", error)
    throw error
  }
}

/**
 * POST: realiza una solicitud POST a API_BASE + endpoint
 * @param {string} endpoint — p.ej. "/auth/login"
 * @param {Object} data — payload JSON
 * @param {string|null} token — JWT si corresponde
 */
export async function postData(endpoint, data, token = null) {
  try {
    const headers = { "Content-Type": "application/json" }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("POST Error:", error)
    throw error
  }
}

/**
 * PUT: realiza una solicitud PUT a API_BASE + endpoint
 * @param {string} endpoint — p.ej. "/users/123"
 * @param {Object} data — payload JSON
 * @param {string|null} token — JWT si corresponde
 */
export async function putData(endpoint, data, token = null) {
  try {
    const headers = { "Content-Type": "application/json" }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`PUT ${endpoint} failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("PUT Error:", error)
    throw error
  }
}

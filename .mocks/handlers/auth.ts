import { http, HttpResponse, delay } from 'msw'
import { currentUser, createAuthResponse, findUserByEmail } from '../data'
import type { LoginDTO, RegisterDTO } from '@/types/auth.types'

const BASE_URL = import.meta.env.VITE_API_URL

export const authHandlers = [
  // POST /auth/login
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(150)

    const body = (await request.json()) as LoginDTO

    const user = findUserByEmail(body.email)

    if (!user || body.password !== 'password123') {
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    return HttpResponse.json(
      createAuthResponse({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      })
    )
  }),

  // POST /auth/register
  http.post(`${BASE_URL}/auth/register`, async ({ request }) => {
    await delay(200)

    const body = (await request.json()) as RegisterDTO

    // Check if email already exists
    const existingUser = findUserByEmail(body.email)
    if (existingUser) {
      return HttpResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
    }

    return HttpResponse.json(createAuthResponse(newUser), { status: 201 })
  }),

  // GET /auth/me
  http.get(`${BASE_URL}/auth/me`, async ({ request }) => {
    await delay(100)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json(currentUser)
  }),

  // POST /auth/logout
  http.post(`${BASE_URL}/auth/logout`, async () => {
    await delay(50)
    return new HttpResponse(null, { status: 204 })
  }),

  // POST /auth/refresh
  http.post(`${BASE_URL}/auth/refresh`, async ({ request }) => {
    await delay(100)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      token: `refreshed-mock-token-${Date.now()}`,
    })
  }),
]

import type { Context, Next } from 'hono'
import { extractToken, verifyToken } from '../utils/jwt'
import { findUserById } from '../db/queries'
import type { SafeUser } from '@cep/shared'

// Extend Honos context to include user.
// We use this so we have type checking for c.get('user')
declare module 'hono' {
  interface ContextVariableMap {
    user: SafeUser
  }
}

// Middleware to verify JWT and attach user to context
export async function authMiddleware(c: Context, next: Next) {
  const token = extractToken(c.req.header('authorization'))
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return c.json({ error: 'Invalid token' }, 401)
  }

  const user = await findUserById(payload.sub)
  if (!user) {
    return c.json({ error: 'User not found' }, 401)
  }

  // Attach user to context for use in route handlers
  // We basically attach data per middleware as we need to access from route handlers or other middlewares
  // And unlike express, where we need to attach req.newCtx, which we need global overrides, here we set and get, and hono handles types
  // If you ever tried top build a prod app with express, you know exactly the pain
  c.set('user', user)

  await next()
}

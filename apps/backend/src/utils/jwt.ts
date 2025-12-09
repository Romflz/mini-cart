import { sign, verify } from 'hono/jwt'
import type { SafeUser } from '@cep/shared'

// TODO: Move to environment variable in production
const JWT_SECRET =
  process.env.JWT_SECRET || 'super-secret-key-change-in-production'

const TOKEN_EXPIRY = 60 * 60 * 24 // 24 hours in seconds

export interface JwtPayload {
  sub: number // Subject user ID
  exp: number // Hono checks EXP by itself. So we don't need to manually check dates
}

// Create a JWT token for a user
export async function createToken(user: SafeUser): Promise<string> {
  return sign(
    {
      sub: user.userId,
      exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY,
    },
    JWT_SECRET
  )
}

// Verify a JWT token and return the payload
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const payload = await verify(token, JWT_SECRET)
    return {
      sub: payload.sub as number,
      exp: payload.exp as number,
    }
  } catch {
    return null
  }
}

// Extract token from Authorization header
export function extractToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.split(' ')[1]
}

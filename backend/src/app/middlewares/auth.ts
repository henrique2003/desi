import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const authHeaders = req.header('Authorization')

  if (!authHeaders) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const [, token] = authHeaders.split('Bearer ')

  if (!token) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET_ID) as { id: string }
    req.userId = decoded.id

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
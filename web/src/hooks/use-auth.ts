'use client'

import { useContext } from 'react'

import { AuthContext } from '@/context/auth'
import { type IAuthContextData } from '@/context/auth/types'

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  return context
}

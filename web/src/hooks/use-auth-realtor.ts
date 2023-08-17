'use client'

import { useContext } from 'react'

import { AuthRealtorContext } from '@/context/auth-realtor'
import { type IAuthRealtorContextData } from '@/context/auth-realtor/types'

export function useAuthRealtor(): IAuthRealtorContextData {
  const context = useContext(AuthRealtorContext)

  return context
}

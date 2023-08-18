'use client'

import React, { createContext, useState, useEffect } from 'react'

import { type IAuthRealtorContextData, type IRealtor } from './types'

import api from '../../services/api'
import { useRouter } from 'next/navigation'
import { toastError, toastSuccess } from '@/utils/use-toast'

interface Props {
  children: JSX.Element
}

export const AuthRealtorContext = createContext({} as IAuthRealtorContextData)

export const AuthRealtorProvider: React.FC<Props> = ({ children }) => {
  const [realtor, setRealtor] = useState<IRealtor | null>(null)
  const [isSignIn, setIsSignIn] = useState<boolean>(false)
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const router = useRouter()

  async function signIn(username: string, password: string): Promise<void> {
    setIsSignIn(true)

    const { data: { realtor, token } } = await api.post('/realtor/login', {
      username,
      password
    })

    api.defaults.headers.common.authRealtororization = `Bearer ${token as string}`

    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('realtor', JSON.stringify(realtor))

    setRealtor(realtor)
    setIsLogged(true)
    setIsSignIn(false)

    router.push('/corretor')
    toastSuccess('Logado com sucesso')
  }

  async function signOut(): Promise<void> {
    setRealtor(null)
    setIsLogged(false)

    localStorage.removeItem('token')
    localStorage.removeItem('realtor')

    router.push('/')
    toastSuccess('Saiu com sucesso')
  }

  function accessDenied(): void {
    toastError('Acesso negado')
    router.push('/')
  }

  useEffect(() => {
    function loadRealtor(): void {
      setIsSignIn(true)

      const token = localStorage.getItem('token')
      const loaclRealtor = localStorage.getItem('realtor')

      if (loaclRealtor && token) {
        api.defaults.headers.common.authRealtororization = `Bearer ${token}`
        setRealtor(JSON.parse(loaclRealtor))
        setIsLogged(true)
      }

      setIsSignIn(false)
    }

    void loadRealtor()
  }, [])

  return (
    <AuthRealtorContext.Provider value={{
      signIn,
      signOut,
      accessDenied,
      realtor,
      isLogged,
      isSignIn
    }}>
      {children}
    </AuthRealtorContext.Provider>
  )
}

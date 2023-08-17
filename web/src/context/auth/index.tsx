'use client'

import React, { createContext, useState, useEffect } from 'react'

import { type IAuthContextData, type IRealtor } from './types'

import api from '../../services/api'
import { useRouter } from 'next/navigation'
import { toastError, toastSuccess } from '@/utils/use-toast'

interface Props {
  children: JSX.Element
}

export const AuthContext = createContext({} as IAuthContextData)

export const AuthProvider: React.FC<Props> = ({ children }) => {
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

    console.log(realtor)

    api.defaults.headers.common.authorization = `Bearer ${token as string}`

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
    async function loadRealtor(): Promise<void> {
      const token = localStorage.getItem('token')
      const loaclRealtor = localStorage.getItem('realtor')

      if (loaclRealtor && token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`
        setRealtor(JSON.parse(loaclRealtor))
        setIsLogged(true)
        return
      }

      setIsSignIn(false)
    }

    void loadRealtor()
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      accessDenied,
      realtor,
      isLogged,
      isSignIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

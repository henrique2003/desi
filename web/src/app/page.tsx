'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { desiLogo } from '@/assets/images'
import { Input } from '@/components'
import { toastError } from '@/utils/use-toast'
import { deafultErrorMessage } from '@/helpers/error-messages'
import { useAuthRealtor } from '@/hooks/use-auth-realtor'

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isLogged, signIn } = useAuthRealtor()
  const router = useRouter()

  useEffect(() => {
    if (isLogged) {
      router.push('/corretor')
    }
  }, [])

  async function onSumit(e: FormEvent): Promise<void | null> {
    try {
      e.preventDefault()

      valdiateFields()

      await signIn(username, password)
    } catch (error) {
      toastError('Email ou senha errado')
    }
  }

  function valdiateFields(): void {
    if (!username) {
      return toastError(deafultErrorMessage('Nome'))
    }

    if (!password) {
      return toastError(deafultErrorMessage('Senha'))
    }
  }

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center flex-col px-3">
      <div className="max-w-[650px] w-full rounded p-5 pb-[50px] flex flex-col justify-center items-center bg-white">
        <Image src={desiLogo} alt="logotipo d&si imoveis" className="w-[150px]" />
        <form className='max-w-[350px] w-full mx-auto flex flex-col justify-center' onSubmit={onSumit}>
          <div className="mt-4">
            <Input
              label='Nome de usuário'
              name='username'
              className='mt-1'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <Input
              type='password'
              label='Senha'
              name='password'
              className='mt-1'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='w-full text-white ease duration-300 bg-blue-900 hover:bg-blue-800 rounded-[8px] h-[45px] mt-10 font-bold'>Entrar</button>
        </form>
      </div>
      <p className="text-gray-700 text-sm mt-5">Não tem uma conta?
        <Link href="/cadastrar" className="text-red-600"> Cadastre-se</Link>
      </p>
    </div>
  )
}

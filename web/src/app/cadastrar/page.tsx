'use client'

import React, { type FormEvent, useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import validator from 'validator'
import InputMask from 'react-input-mask'

import { Input, InputRadio } from '@/components'
import validateCpf from '@/utils/validate-cpf'
import Link from 'next/link'
import { toastError, toastSuccess } from '@/utils/use-toast'
import { deafultErrorMessage } from '@/helpers/error-messages'
import { useAuthRealtor } from '@/hooks/use-auth-realtor'
import { useRouter } from 'next/navigation'
import api from '@/services/api'

export default function Register(): JSX.Element {
  // 1/4
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [celphone, setCelphone] = useState('')
  const [cpf, setCpf] = useState('')
  // 2/4
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfimation, setPasswordConfimation] = useState('')
  // 3/4
  const [trainee, setTrainee] = useState(true)
  const [supervisorCrecci, setSupervisorCrecci] = useState('')
  // 4/4
  const [rg, setRg] = useState<File | null>(null)
  const [creci, setCreci] = useState<File | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [isSignIn, setIsSignIn] = useState(false)

  const { isLogged } = useAuthRealtor()
  const router = useRouter()

  useEffect(() => {
    if (isLogged) {
      router.push('/corretor')
    }
  }, [])

  async function onSubmit(e: FormEvent): Promise<void | null> {
    try {
      e.preventDefault()
      setIsSignIn(true)

      if (!validateFields()) {
        setIsSignIn(false)
        return
      }

      const formData = new FormData()

      const configRequest = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      formData.append('username', username)
      formData.append('password', password)
      formData.append('name', name)
      formData.append('surname', surname)
      formData.append('cpf', cpf)
      formData.append('celphone', celphone)
      formData.append('trainee', `${trainee}`)
      formData.append('email', email)
      formData.append('supervisorCrecci', supervisorCrecci)
      formData.append('creci', creci as File)
      formData.append('rg', rg as File)

      const { data: { realtor, token } } = await api.post('/realtor', formData, configRequest)

      api.defaults.headers.common.authRealtororization = `Bearer ${token as string}`

      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('realtor', JSON.stringify(realtor))

      router.push('/corretor')
      toastSuccess('Logado com sucesso')
      setIsSignIn(false)
    } catch (error) {
      console.log(error)

      toastError('Erro no cadastro')
      setIsSignIn(false)
    }
  }

  function validateFields(): boolean {
    // 1/4
    if (!name) {
      toastError(deafultErrorMessage('Nome'))
      return false
    }

    if (!surname) {
      toastError(deafultErrorMessage('Sobrenome'))
      return false
    }

    if (!email || !validator.isEmail(email)) {
      toastError(deafultErrorMessage('Email'))
      return false
    }

    const validCelphone = celphone.replace('(', '').replace(')', '').replace('-', '').replace('.', '')
    if (!celphone || !validator.isMobilePhone(validCelphone, 'pt-BR')) {
      toastError(deafultErrorMessage('Telefone'))
      return false
    }

    const validCpf = cpf.replace('.', '').replace('-', '').replace('.', '')
    if (!cpf || !validateCpf(Number(validCpf))) {
      toastError(deafultErrorMessage('Cpf'))
      return false
    }

    // 2/4
    if (!username) {
      toastError(deafultErrorMessage('Nome'))
      return false
    }

    if (!password) {
      toastError(deafultErrorMessage('Senha'))
      return false
    }

    if (password !== passwordConfimation) {
      toastError(deafultErrorMessage('Confirmar senha'))
      return false
    }

    // 3/4
    if (!trainee) {
      toastError(deafultErrorMessage('Estagiário'))
      return false
    }

    if (!supervisorCrecci) {
      toastError(deafultErrorMessage('Creci do supervisor'))
      return false
    }

    // 4/4
    if (!rg) {
      toastError(deafultErrorMessage('Rg'))
      return false
    }

    if (!creci) {
      toastError(deafultErrorMessage('Creci'))
      return false
    }

    if (!acceptTerms) {
      toastError('Aceite os termos e condições')
      return false
    }

    return true
  }

  const onRgDrop = useCallback((acceptedFiles: File[]) => {
    // Filter acceptedFiles to only keep image and PDF files
    const validFiles = acceptedFiles.filter(
      (file) => file.type.startsWith('image/') || file.type === 'application/pdf'
    )

    setRg(validFiles[0] || null)
  }, [])

  const onCreciDrop = useCallback((acceptedFiles: File[]) => {
    // Filter acceptedFiles to only keep image and PDF files
    const validFiles = acceptedFiles.filter(
      (file) => file.type.startsWith('image/') || file.type === 'application/pdf'
    )

    setCreci(validFiles[0] || null)
  }, [])

  const rgDropzone = useDropzone({
    onDrop: onRgDrop
  })

  const creciDropzone = useDropzone({
    onDrop: onCreciDrop
  })

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-start items-center px-3 pb-10">
      <div className='max-w-[1200px] mx-auto mt-10 w-full flex gap-5 max-lg:flex-col'>
        <div className='rounded-[5px] p-10 bg-blue-800 max-w-[400px] h-[240px] max-lg:max-w-full max-lg:h-auto'>
          <h3 className='text-4xl text-slate-200 mt-2 font-semibold'>Cadastre-se</h3>
          <p className='text-white text-md mt-5'>Comece a receber as melhores informações do mercado e venda com a melhor comissão!</p>
        </div>
        <form className='w-full' onSubmit={onSubmit}>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15'>
            <p className='mt-2 text-md text-red-600'>1/4</p>
            <h3 className='text-xl font-semibold text-blue-800 mt-2'>Informações Pessoais</h3>
            <Input
              label='Nome'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
              className='mt-6'
            />
            <Input
              label='Sobrenome'
              name='surname'
              value={surname}
              onChange={e => setSurname(e.target.value)}
              className='mt-4'
            />
            <Input
              type='email'
              label='Email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='mt-4'
            />
            <Input
              label='Telefone'
              className='mt-4'
            >
              <InputMask
                mask="(99) 99999-9999"
                value={celphone}
                name='celphone'
                onChange={(e) => setCelphone(e.target.value)}
                className='w-full h-[30px] focus:outline-none text-gray-600 placeholder:text-gray-500'
              />
            </Input>
            <Input
              label='Cpf'
              className='mt-4'
            >
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                name='cpf'
                onChange={(e) => setCpf(e.target.value)}
                className='w-full h-[30px] focus:outline-none text-gray-600 placeholder:text-gray-500'
              />
            </Input>
          </div>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15 mt-5'>
            <p className='mt-2 text-md text-red-600'>2/4</p>
            <h3 className='text-xl font-semibold text-blue-800 mt-2'>Informação de Acesso</h3>
            <Input
              label='Nome de usuário'
              name='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='mt-6'
            />
            <Input
              label='Senha'
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='mt-4'
            />
            <Input
              label='Confirmar senha'
              type='password'
              name='passwordConfimation'
              value={passwordConfimation}
              onChange={e => setPasswordConfimation(e.target.value)}
              className='mt-4'
            />
          </div>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15 mt-5'>
            <p className='mt-2 text-md text-red-600'>3/4</p>
            <h3 className='text-xl font-semibold text-blue-800 mt-2'>Estagiários</h3>
            <p className='mt-5 text-sm text-gray-500 font-light'>Se você for estagiário, selecione a opção abaixo:</p>
            <InputRadio
              label='Estagiário'
              name='trainee'
              id='trainee'
              className='mt-5'
              value={'true'}
              defaultChecked
              onChange={e => setTrainee(Boolean(e.target.value))}
            />
            <InputRadio
              label='Não sou estagiário'
              name='trainee'
              id='dontTrainee'
              className='mt-2'
              value={'false'}
              onChange={e => setTrainee(Boolean(e.target.value))}
            />
            <Input
              label='Creci do supervisor'
              name='supervisioCreci'
              value={supervisorCrecci}
              onChange={e => setSupervisorCrecci(e.target.value)}
              className='mt-6'
            />
          </div>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15 mt-5'>
            <p className='mt-2 text-md text-red-600'>4/4</p>
            <h3 className='text-xl font-semibold text-blue-800 mt-2'>Envio de Documentos</h3>
            <p className='mt-3 text-md text-gray-500 font-light'>Para confirmarmos sua conta, precisamos de alguns documentos</p>
            <h3 className='text-lg font-bold text-blue-900 mt-3'>RG</h3>
            <p className='mt-1 text-sm text-gray-500 font-light'>Apenas arquivo .jpg .png ou .pdf. Máximos de 500mb.</p>
            <div
              className={twMerge(
                'w-full h-[45px] flex items-center justify-center border border-dashed border-blue-900 rounded-[10px] ease duration-300 cursor-pointer mt-5'
              )}
              {...rgDropzone.getRootProps()}
            >
              <input {...rgDropzone.getInputProps()} />
              <p className='text-sm text-blue-900 font-medium'>Arraste arquivo aqui ou clique para fazer upload</p>
            </div>
            <div className='flex'>
              {rg && (
                <p className='text-md text-black bg-slate-500 rounded-xl mt-5 px-2 font-normal'>{rg.name}</p>
              )}
            </div>
            <div className='w-full h-[1px] bg-slate-400 my-10'></div>
            <h3 className='text-lg font-bold text-blue-900'>CRECI</h3>
            <p className='mt-1 text-sm text-gray-500 font-light'>Apenas arquivo .jpg .png ou .pdf. Máximos de 500mb.</p>
            <div
              className={twMerge(
                'w-full h-[45px] flex items-center justify-center border border-dashed border-blue-900 rounded-[10px] ease duration-300 cursor-pointer mt-5'
              )}
              {...creciDropzone.getRootProps()}
            >
              <input itemID='creci' id='creci' name='creci' {...creciDropzone.getInputProps()} />
              <p className='text-sm text-blue-900 font-medium'>Arraste arquivo aqui ou clique para fazer upload</p>
            </div>
            <div className='flex'>
              {creci && (
                <p className='text-md text-black bg-slate-500 rounded-xl mt-5 px-2 font-normal'>{creci.name}</p>
              )}
            </div>
            <div className='flex gap-2 mt-10'>
              <input
                type="checkbox"
                className="w-[17px] h-[17px] outline-none"
                onChange={() => setAcceptTerms(!acceptTerms)}
              />
              <p className='text-md text-gray-700 leading-4'>Li e aceito os {' '}
                <Link href='/termos-de-uso' target='_blank' className='text-blue-700 cursor-pointer'>termos</Link>
                {' '} e {' '}
                <Link href='/condicoes' target='_blank' className='text-blue-700 cursor-pointer'>condições</Link></p>
            </div>
          </div>
          <button type='submit' className='w-[100px] h-[40px] bg-blue-900 ease duration-300 hover:bg-blue-800 text-white font-bold text-md rounded-[8px] mt-5 disabled:bg-blue-900' disabled={isSignIn}>Criar</button>
        </form>
      </div >
    </div >
  )
}

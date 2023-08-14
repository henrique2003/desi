'use client'

import React, { type FormEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-toastify'
import validator from 'validator'
import InputMask from 'react-input-mask'

import { Input, InputRadio } from '@/components'
import validateCpf from '@/utils/validate-cpf'
import NavigationLinkProfile from '@/components/profile/navigation-link-profile'

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
  const [crecci, setCrecci] = useState<File | null>(null)

  const onSubmit = async (e: FormEvent): Promise<void> => {
    try {
      e.preventDefault()

      validateFields()
    } catch (error) {

    }
  }

  function validateFields(): any {
    const toastConfig = {
      hideProgressBar: false
    }

    // 1/4
    if (!name) {
      return toast.error(deafultErrorMessage('Nome'), toastConfig)
    }

    if (!surname) {
      return toast.error(deafultErrorMessage('Sobrenome'), toastConfig)
    }

    if (!email || !validator.isEmail(email)) {
      return toast.error(deafultErrorMessage('Email'), toastConfig)
    }

    const validCelphone = celphone.replace('(', '').replace(')', '').replace('-', '').replace('.', '')
    if (!celphone || !validator.isMobilePhone(validCelphone, 'pt-BR')) {
      return toast.error(deafultErrorMessage('Telefone'), toastConfig)
    }

    const validCpf = cpf.replace('.', '').replace('-', '').replace('.', '')
    if (!cpf || !validateCpf(Number(validCpf))) {
      return toast.error(deafultErrorMessage('Cpf'), toastConfig)
    }

    // 2/4
    if (!username) {
      return toast.error(deafultErrorMessage('Nome'), toastConfig)
    }

    if (!password) {
      return toast.error(deafultErrorMessage('Senha'), toastConfig)
    }

    if (password !== passwordConfimation) {
      return toast.error(deafultErrorMessage('Confirmar senha'), toastConfig)
    }

    // 3/4
    if (!trainee) {
      return toast.error(deafultErrorMessage('Estagiário'), toastConfig)
    }

    if (!supervisorCrecci) {
      return toast.error(deafultErrorMessage('Crecci do supervisor'), toastConfig)
    }

    // 4/4
    if (!rg) {
      return toast.error(deafultErrorMessage('Rg'), toastConfig)
    }

    if (!crecci) {
      return toast.error(deafultErrorMessage('Crecci'), toastConfig)
    }
  }

  function deafultErrorMessage(field: string): string {
    return `Campo "${field}" inválido`
  }

  const onRgDrop = useCallback((acceptedFiles: File[]) => {
    // Filter acceptedFiles to only keep image and PDF files
    const validFiles = acceptedFiles.filter(
      (file) => file.type.startsWith('image/') || file.type === 'application/pdf'
    )

    setRg(validFiles[0] || null)
  }, [])

  const onCrecciDrop = useCallback((acceptedFiles: File[]) => {
    // Filter acceptedFiles to only keep image and PDF files
    const validFiles = acceptedFiles.filter(
      (file) => file.type.startsWith('image/') || file.type === 'application/pdf'
    )

    setCrecci(validFiles[0] || null)
  }, [])

  const rgDropzone = useDropzone({
    onDrop: onRgDrop
  })

  const crecciDropzone = useDropzone({
    onDrop: onCrecciDrop
  })

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-start items-center px-3 pb-10">
      <div className='max-w-[1200px] mx-auto mt-10 w-full flex gap-10 max-lg:flex-col'>
        <div className='rounded-[5px] p-[50px] bg-white max-w-[350px] w-full max-lg:max-w-full max-lg:h-auto fixed max-lg:static'>
          <h3 className='text-gray-700 text-lg font-bold'>Meu perfil</h3>
          <div className='flex flex-col gap-5 items-start mt-7'>
            <NavigationLinkProfile
              text='Dados Pessoais'
              link='#personal_information'
            />
            <NavigationLinkProfile
              text='Acesso'
              link='#access_information'
            />
            <NavigationLinkProfile
              text='Estagiários'
              link='#trainees'
            />
            <NavigationLinkProfile
              text='Envio de documentos'
              link='#send_docs'
            />
          </div>
        </div>
        <div className='max-w-[350px] w-full max-lg:hidden'></div>
        <form className='w-full' onSubmit={onSubmit}>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15' id='personal_information'>
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
          <div className='w-full bg-white rounded-[5px] p-10 pb-15 mt-5' id='access_information'>
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
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='mt-4'
            />
            <Input
              label='Confirmar senha'
              name='passwordConfimation'
              value={passwordConfimation}
              onChange={e => setPasswordConfimation(e.target.value)}
              className='mt-4'
            />
          </div>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15 mt-5' id='trainees'>
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
          <div className='w-full bg-white rounded-[5px] p-10 pb-15 mt-5' id='send_docs'>
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
              {...crecciDropzone.getRootProps()}
            >
              <input itemID='creci' id='creci' name='creci' {...crecciDropzone.getInputProps()} />
              <p className='text-sm text-blue-900 font-medium'>Arraste arquivo aqui ou clique para fazer upload</p>
            </div>
            <div className='flex'>
              {crecci && (
                <p className='text-md text-black bg-slate-500 rounded-xl mt-5 px-2 font-normal'>{crecci.name}</p>
              )}
            </div>
          </div>
          <button type='submit' className='w-[100px] h-[40px] bg-blue-900 ease duration-300 hover:bg-blue-800 text-white font-bold text-md rounded-[8px] mt-5'>Salvar</button>
        </form>
      </div >
    </div >
  )
}

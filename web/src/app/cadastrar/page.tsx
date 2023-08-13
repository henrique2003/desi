'use client'

import React, { type FormEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-toastify'
import validator from 'validator'
import InputMask from 'react-input-mask'

import { Input, InputRadio } from '@/components'
import validateCpf from '@/utils/validate-cpf'

export default function Register(): JSX.Element {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [celphone, setCelphone] = useState('')
  const [cpf, setCpf] = useState('')

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
  }

  function deafultErrorMessage(field: string): string {
    return `Campo "${field}" inválido`
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the dropped files
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
              name='name'
              className='mt-6'
            />
            <Input
              label='Senha'
              name='password'
              className='mt-4'
            />
            <Input
              label='Confirmar senha'
              name='passoword_cofirmation'
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
            />
            <InputRadio
              label='Não sou estagiário'
              name='trainee'
              id='dontTrainee'
              className='mt-2'
              value={'false'}
            />
            <Input
              label='Creci do supervisor'
              name='supervisioCreci'
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
                'w-full h-[45px] flex items-center justify-center border border-dashed border-blue-900 rounded-[10px] ease duration-300 cursor-pointer mt-5',
                isDragActive && 'border-green-500'
              )}
              {...getRootProps()}
            >
              <input name='rg' {...getInputProps()} />
              <p className='text-sm text-blue-900 font-medium'>Arraste arquivo aqui ou clique para fazer upload</p>
            </div>
            <div className='flex'>
              <p className='text-md text-black bg-slate-500 rounded-xl mt-5 px-2 font-normal'>38233.pdf</p>
            </div>
            <div className='w-full h-[1px] bg-slate-400 my-10'></div>
            <h3 className='text-lg font-bold text-blue-900'>CRECI</h3>
            <p className='mt-1 text-sm text-gray-500 font-light'>Apenas arquivo .jpg .png ou .pdf. Máximos de 500mb.</p>
            <div
              className={twMerge(
                'w-full h-[45px] flex items-center justify-center border border-dashed border-blue-900 rounded-[10px] ease duration-300 cursor-pointer mt-5',
                isDragActive && 'border-green-500'
              )}
              {...getRootProps()}
            >
              <input name='creci' {...getInputProps()} />
              <p className='text-sm text-blue-900 font-medium'>Arraste arquivo aqui ou clique para fazer upload</p>
            </div>
            <div className='flex'>
              <p className='text-md text-black bg-slate-500 rounded-xl mt-5 px-2 font-normal'>38233.pdf</p>
            </div>
          </div>
          <button type='submit' className='w-[100px] h-[40px] bg-blue-900 ease duration-300 hover:bg-blue-800 text-white font-bold text-md rounded-[8px] mt-5'>Criar</button>
        </form>
      </div >
    </div >
  )
}

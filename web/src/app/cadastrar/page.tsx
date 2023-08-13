'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Input, InputRadio } from '@/components'
import { twMerge } from 'tailwind-merge'

export default function Register(): JSX.Element {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the dropped files
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-start items-center flex-col px-3 pb-10">
      <div className='max-w-[1200px] mx-auto mt-10 w-full flex gap-5'>
        <div className='rounded-[5px] p-10 bg-blue-800 max-w-[400px] h-[240px]'>
          <h3 className='text-4xl text-slate-200 mt-2 font-semibold'>Cadastre-se</h3>
          <p className='text-white text-md mt-5'>Comece a receber as melhores informações do mercado e venda com a melhor comissão!</p>
        </div>
        <form className='w-full'>
          <div className='w-full bg-white rounded-[5px] p-10 pb-15'>
            <p className='mt-2 text-md text-red-600'>1/4</p>
            <h3 className='text-xl font-semibold text-blue-800 mt-2'>Informações Pessoais</h3>
            <Input
              label='Nome'
              name='name'
              className='mt-6'
            />
            <Input
              label='Sobrenome'
              name='surname'
              className='mt-4'
            />
            <Input
              type='email'
              label='Email'
              name='email'
              className='mt-4'
            />
            <Input
              label='Telefone'
              name='celphone'
              className='mt-4'
            />
            <Input
              label='Cpf'
              name='cpf'
              className='mt-4'
            />
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
      </div>
    </div>
  )
}

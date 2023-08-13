import Image from 'next/image'
import Link from 'next/link'

import { desiLogo } from '@/assets/images'
import { Input } from '@/components'

export default function Login(): JSX.Element {
  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center flex-col">
      <div className="max-w-[650px] w-full rounded p-5 pb-[50px] flex flex-col justify-center items-center bg-white">
        <Image src={desiLogo} alt="logotipo d&si imoveis" className="w-[150px]" />
        <form className='max-w-[350px] w-full mx-auto flex flex-col justify-center'>
          <div className="mt-4">
            <Input
              label='Username'
              name='name'
              className='mt-1'
            />
          </div>
          <div className="mt-5">
            <Input
              label='Password'
              name='password'
              className='mt-1'
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

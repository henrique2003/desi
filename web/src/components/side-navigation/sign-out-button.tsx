'use client'

import { useAuthRealtor } from '@/hooks/use-auth-realtor'

const SignOutButton: React.FC = () => {
  const { signOut } = useAuthRealtor()

  return (
    <button
      type='button'
      className='bg-transparent text-sm text-gray-800'
      onClick={async () => await signOut()}
    >Sair</button>
  )
}

export default SignOutButton

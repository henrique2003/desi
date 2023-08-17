import Image from 'next/image'

import SideNavigationItem from './side-navigation-item'
import { desiLogo } from '@/assets/images'
import { proprietie, profile } from '@/assets/icons'
import Link from 'next/link'
import SignOutButton from './sign-out-button'

const SideNavigation: React.FC = () => {
  return (
    <>
      <div className="max-w-[110px] w-full min-h-screen h-full flex flex-col justify-between items-center bg-white border-r-2 border-blue-500 px-3 fixed">
        <Link href='/corretor'>
          <Image src={desiLogo} alt='logo tipo desi' className='mt-1' />
          <div className='w-[60px] my-4 mx-auto bg-gray-300 h-[1px]'></div>
        </Link>
        <div className='flex flex-1 flex-col justify-between items-center py-5'>
          <SideNavigationItem
            href="/corretor/imoveis"
            image={proprietie}
            text="Imóveis"
          />
          <div className='flex flex-col gap-2 justify-center items-center'>
            <div className='w-[60px] my-6 mx-auto bg-gray-300 h-[1px]'></div>
            <SideNavigationItem
              href="/corretor/perfil"
              image={profile}
              text="Perfil"
            />
            <SignOutButton />
          </div>
        </div>
      </div>
      <div className='max-w-[110px] w-full min-h-screen h-full'></div>
    </>
  )
}

export default SideNavigation

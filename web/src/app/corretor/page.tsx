'use client'

import { useEffect } from 'react'

import { RealtorContainer } from '@/components'
import { CarouselBanners, WelcomeWrapper } from '@/components/realtor'
import { useAuthRealtor } from '@/hooks/use-auth-realtor'

const RealtorHome: React.FC = () => {
  const { isLogged, accessDenied, isSignIn } = useAuthRealtor()

  useEffect(() => {
    if (isSignIn) {
      if (!isLogged) {
        accessDenied()
      }
    }
  }, [])

  return (
    <RealtorContainer>
      <>
        <WelcomeWrapper />
        <CarouselBanners />
      </>
    </RealtorContainer>
  )
}

export default RealtorHome

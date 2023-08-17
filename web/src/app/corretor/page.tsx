import { RealtorContainer } from '@/components'
import { CarouselBanners, WelcomeWrapper } from '@/components/realtor'

const RealtorHome: React.FC = () => {
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

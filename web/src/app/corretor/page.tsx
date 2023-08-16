import { RealtorContainer } from '@/components'
import { WelcomeWrapper } from '@/components/realtor'

const RealtorHome: React.FC = () => {
  return (
    <RealtorContainer>
      <>
        <WelcomeWrapper />
        {/* <div className='w-full border border-red-500 h-[400px]'></div> */}
      </>
    </RealtorContainer>
  )
}

export default RealtorHome

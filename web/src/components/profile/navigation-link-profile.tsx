import Link from 'next/link'

interface IProps {
  text: string
  link: string
}

const NavigationLinkProfile: React.FC<IProps> = ({ text, link }) => {
  return <Link href={link} className='text-sm font-normal text-gray-600'>{text}</Link>
}

export default NavigationLinkProfile

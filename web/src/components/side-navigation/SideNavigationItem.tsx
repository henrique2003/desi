import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

interface IProps {
  href: string
  image: StaticImageData
  text: string
}

const SideNavigationItem: React.FC<IProps> = ({ image, text, href }) => {
  return (
    <Link href={href} className="flex flex-col justify-center gap-1 items-center">
      <Image src={image} alt={text} className='w-[40px]' />
      <p className="text-sm text-gray-500">{text}</p>
    </Link>
  )
}

export default SideNavigationItem

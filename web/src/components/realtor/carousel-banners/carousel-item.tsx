import Image, { type StaticImageData } from 'next/image'

interface IProps {
  image: StaticImageData
  i: number
}

const CarouselItem: React.FC<IProps> = ({ image, i }) => {
  return (
    <div>
      <Image src={image} alt={`banner de imoveis numero ${i}`} />
    </div>
  )
}

export default CarouselItem

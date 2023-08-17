'use client'

import { banner01, banner02, banner03 } from '@/assets/images'
import CarouselItem from './carousel-item'
import { Carousel } from '@/components'

const images = [
  banner01,
  banner02,
  banner03
]

const CarouselBanners: React.FC = () => {
  return (
    <Carousel className='mt-10'>
      {images.map((item, i) => (
        <CarouselItem
          key={i}
          i={i}
          image={item}
        />
      ))}
    </Carousel>
  )
}

export default CarouselBanners

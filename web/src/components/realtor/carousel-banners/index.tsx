'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { banner01, banner02, banner03 } from '@/assets/images'
import CarouselItem from './carousel-item'

const images = [
  banner01,
  banner02,
  banner03
]

const CarouselBanners: React.FC = () => {
  return (
    <Carousel
      className='mt-10'
      infiniteLoop
      interval={3000}
      autoPlay
      showStatus={false}
    >
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

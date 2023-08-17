'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel as CarouselComponent } from 'react-responsive-carousel'

interface IProps {
  children: JSX.Element[]
  className?: string
}

const Corousel: React.FC<IProps> = ({ children, className = '' }) => {
  return (
    <CarouselComponent
      className={className}
      infiniteLoop
      interval={3000}
      autoPlay
      showStatus={false}
    >
      {children}
    </CarouselComponent>
  )
}

export default Corousel

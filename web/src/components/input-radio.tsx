'use client'

import { type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type IProps = ComponentProps<'input'> & {
  label: string
}

const InputRadio: React.FC<IProps> = ({ className, label, ...props }) => {
  return (
    <div className={twMerge(
      'flex items-center',
      className
    )}>
      <input
        {...props}
        type="radio"
        className='w-4 h-4' />
      <label
        htmlFor="default-radio-1"
        className="ml-2 text-gray-500 text-sm leading-6 block">{label}</label>
    </div>
  )
}

export default InputRadio

'use client'

import { type ComponentProps, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type IProps = ComponentProps<'input'> & {
  label: string
  children?: JSX.Element
}

const Input: React.FC<IProps> = ({ className, label, children, ...props }) => {
  const [focus, setFocus] = useState(false)

  return (
    <fieldset className={twMerge(
      'w-full border border-gray-400 ease duration-200 rounded-[8px] px-4 h-[60px] text-sm placeholder:text-gray-500',
      focus && 'border-blue-700',
      className
    )}>
      <legend className='text-gray-600 text-sm'>{label}</legend>
      {children ?? <input
        {...props}
        type="text"
        className='w-full h-[30px] focus:outline-none text-gray-600 placeholder:text-gray-500'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />}
    </fieldset>
  )
}

export default Input

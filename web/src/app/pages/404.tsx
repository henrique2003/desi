'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NotFound: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    void router.push('/')
  }, [])

  return <div />
}

export default NotFound

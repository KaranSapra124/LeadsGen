'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const useAuthGuard = () => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('userAuth')
        if (!token) {
            router.push('/Auth/login') // redirect to login if not authenticated
        }
    }, [router])
}

export default useAuthGuard

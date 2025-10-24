import RootLayout from '@/app/components/RootLayout/RootLayout'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='flex'>
                <RootLayout />
                <div className=' flex justify-center  w-full'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
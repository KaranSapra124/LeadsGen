import RootLayout from '@/app/components/RootLayout/RootLayout'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <>
            <div className='flex'>
                <RootLayout />
                <div className='md:px-10 md:py-5 px-2 py-3 mx-auto w-full'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
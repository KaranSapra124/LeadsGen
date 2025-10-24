import Link from 'next/link'
import React from 'react'

const RootLayout = () => {
    const navLinks = [
        {
            title: "Leads",
            link: "/Routes/Dashboard/Lead"
        },
        {
            title: "Settings",
            link: "/Routes/Dashboard/Settings"
        }
    ]
    return (
        <div className='flex flex-col bg-black p-2 rounded h-screen min-w-60'>
            {navLinks?.map((li, index) => {
                return <Link className='text-white px-2 py-1 text-xl ' key={li?.title} href={li?.link}>{li?.title}</Link>
            })}
        </div>
    )
}

export default RootLayout
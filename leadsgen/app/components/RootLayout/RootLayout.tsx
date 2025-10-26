"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import useAuthGuard from "../Global/AuthGuard"
import { Menu, X, LogOut } from "lucide-react"

const RootLayout = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    //   const { logout } = useAuthGuard() // assuming your AuthGuard exposes a logout function

    const navLinks = [
        {
            title: "Leads",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M19.938 8H21a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8 8 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 0 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0M3 10v4h1v-4zm17 0v4h1v-4zM7.76 15.785l1.06-1.696A5.97 5.97 0 0 0 12 15a5.97 5.97 0 0 0 3.18-.911l1.06 1.696A7.96 7.96 0 0 1 12 17a7.96 7.96 0 0 1-4.24-1.215"
                    />
                </svg>
            ),
            link: "/Routes/Dashboard/Lead",
        },
        {
            title: "Settings",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12.563 3.2h-1.126l-.645 2.578l-.647.2a6.3 6.3 0 0 0-1.091.452l-.599.317l-2.28-1.368l-.796.797l1.368 2.28l-.317.598a6.3 6.3 0 0 0-.453 1.091l-.199.647l-2.578.645v1.126l2.578.645l.2.647q.173.568.452 1.091l.317.599l-1.368 2.28l.797.796l2.28-1.368l.598.317q.523.278 1.091.453l.647.199l.645 2.578h1.126l.645-2.578l.647-.2a6.3 6.3 0 0 0 1.091-.452l.599-.317l2.28 1.368l.796-.797l-1.368-2.28l.317-.598q.278-.523.453-1.091l.199-.647l2.578-.645v-1.126l-2.578-.645l-.2-.647a6.3 6.3 0 0 0-.452-1.091l-.317-.599l1.368-2.28l-.797-.796l-2.28 1.368l-.598-.317a6.3 6.3 0 0 0-1.091-.453l-.647-.199zm2.945 2.17l1.833-1.1a1 1 0 0 1 1.221.15l1.018 1.018a1 1 0 0 1 .15 1.221l-1.1 1.833q.33.62.54 1.3l2.073.519a1 1 0 0 1 .757.97v1.438a1 1 0 0 1-.757.97l-2.073.519q-.21.68-.54 1.3l1.1 1.833a1 1 0 0 1-.15 1.221l-1.018 1.018a1 1 0 0 1-1.221.15l-1.833-1.1q-.62.33-1.3.54l-.519 2.073a1 1 0 0 1-.97.757h-1.438a1 1 0 0 1-.97-.757l-.519-2.073a7.5 7.5 0 0 1-1.3-.54l-1.833 1.1a1 1 0 0 1-1.221-.15L4.42 18.562a1 1 0 0 1-.15-1.221l1.1-1.833a7.5 7.5 0 0 1-.54-1.3l-2.073-.519A1 1 0 0 1 2 12.72v-1.438a1 1 0 0 1 .757-.97l2.073-.519q.21-.68.54-1.3L4.27 6.66a1 1 0 0 1 .15-1.221L5.438 4.42a1 1 0 0 1 1.221-.15l1.833 1.1q.62-.33 1.3-.54l.519-2.073A1 1 0 0 1 11.28 2h1.438a1 1 0 0 1 .97.757l.519 2.073q.68.21 1.3.54zM12 14.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                    />
                </svg>
            ),
            link: "/Routes/Dashboard/Settings",
        },
    ]

    const handleLogout = () => {
        localStorage.removeItem("userAuth")
        router.push("/Auth/login") // redirect to login
    }
    useAuthGuard()
    return (
        <>
            {/* 🔹 Mobile Topbar */}
            <div className="md:hidden flex items-center justify-between rounded-full text-black px-1 py-1 fixed top-0 left-0 w-fit">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-200">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 🔹 Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-screen bg-neutral-900 text-white flex flex-col justify-between transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 w-64 z-40`}
            >
                <div className="p-4 mt-12 md:mt-0">
                    <h1 className="text-xl font-semibold text-center mb-6 tracking-wide hidden md:block">
                        LeadsGen<span className="text-blue-500">.AI</span>
                    </h1>

                    <nav className="space-y-2">
                        {navLinks.map((item) => {
                            const isActive = pathname === item.link
                            return (
                                <Link
                                    key={item.title}
                                    href={item.link}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-300 hover:bg-neutral-800 hover:text-white"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="text-gray-300">{item.icon}</span>
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            )
                        })}

                        {/* 🔹 Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-neutral-800 hover:text-red-400 w-full mt-4"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </div>

                <div className="text-sm text-gray-500 text-center border-t border-neutral-800 py-3">
                    © 2025 LeadsGen.AI
                </div>
            </aside>

            {/* 🔹 Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setIsOpen(false)} />
            )}
        </>
    )
}

export default RootLayout

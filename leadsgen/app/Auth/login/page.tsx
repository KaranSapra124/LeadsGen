'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLogin } from '@/app/utils/queryServices'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// import { toast } from 'react-hot-toast'

export interface loginType {
    email: string,
    password: string
}
const LoginView = () => {
    const router = useRouter()
    const { mutate: handleLogin, data: response, isPending } = useLogin()
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submit
        handleLogin({ data: formData }, {
            onSuccess: (res) => {

                alert(res?.data?.message);
                localStorage.setItem("userAuth", res?.data?.token)
                router.push("/")
            }
        })

        // toast.success('Mock login successful!')
        // setFormData({ email: '', password: '' })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                        Login
                    </Button>
                    <div className='text-xs text-center text-gray-400 font-semibold'>Don't have an account , <Link className='text-blue-500 underline ' href={"/Auth/register"}>Create</Link></div>

                </form>
            </div>
        </div>
    )
}

export default LoginView

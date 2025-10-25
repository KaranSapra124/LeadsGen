'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRegister } from '@/app/utils/queryServices'
import { redirect } from 'next/navigation'
// import { toast } from 'react-hot-toast'

// Define the form data structure
export interface RegisterFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}


const RegisterView = () => {
    const { mutate: handleRegister, data: response, isPending } = useRegister()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submit
        if (formData.password !== formData.confirmPassword) {
            //   toast.error("Passwords do not match!")
            return
        }
        handleRegister({ data: formData })
        console.log(response)
        alert(response?.data?.message);
        localStorage.setItem("userAuth", response?.data?.token)
        redirect("/")

        // toast.success('Mock registration successful!')
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

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

                    {/* Confirm Password */}
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default RegisterView

// backend/Controller/AuthController.js
import User from "../Model/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = "1d" // token expiry

// Helper: create JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    )
}

// Signup controller
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = new User({ name, email, password })
        await user.save()

        const token = generateToken(user)
        return res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        })
    } catch (err) {
        return res.status(500).json({ message: `Error creating user: ${err.message}` })
    }
}

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Update last login
        user.lastLogin = new Date()
        await user.save()

        const token = generateToken(user)
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        })
    } catch (err) {
        return res.status(500).json({ message: `Error logging in: ${err.message}` })
    }
}

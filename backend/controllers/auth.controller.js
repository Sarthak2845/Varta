const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: "Request body is missing" })
        }
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Name, email and password are required" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const avatarUrl = `https://api.dicebear.com/9.x/big-smile/svg?seed=${name.trim().replace(/\s+/g, '')}`;
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatarUrl
        });
        await newUser.save();
        return res.status(201).send({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                avatarUrl: newUser.avatarUrl
            }
        })
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
}
const login = async (req, res) => {
    if (!req.body) {
            return res.status(400).send({ message: "Request body is missing" })
        }
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        const isPasswordVaild = await bcrypt.compare(password, user.password);
        if (!isPasswordVaild) {
            return res.status(401).send({ message: "Invalid password" })
        }
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );
        res.cookie('accessToken', accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10 * 24 * 60 * 60 * 1000
        })
        return res.status(200).send({ message: "Login successful" })
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
}
const logout = (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};
module.exports = {
    register,
    login,
    logout
}
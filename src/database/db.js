import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongodbUri = process.env.MONGODB_URI || 'nada'

export const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

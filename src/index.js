import dotenv from 'dotenv'
import app from '../app.js'
import {connectDB} from "./database/db.js";
dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT)

connectDB()
    .then(() => console.log('Database connected'))
    .catch((e) => console.error('Error =>', e))

console.log(`Servicio correindo en:\nhttp://localhost:${PORT}`)

import express from 'express'
import authRoutes from './src/routes/auth.routes.js'
import postRoutes from './src/routes/post.routes.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

export default app

import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import { connectDB } from './db/connection.js'
import { initApp } from './src/initApp.js'
const app = express()
const port = 3000
dotenv.config({ path: path.resolve('./config/.env') })
connectDB()
initApp(app, express)
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))
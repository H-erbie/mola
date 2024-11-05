require('dotenv').config()
require('express-async-handler')


const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean');
const errorHandler = require('./midddleware/errorHandler')
const notFound = require('./midddleware/nofFound')
const authRouter = require('./routes/auth')
const sherpRouter = require('./routes/sherp') 
const connectDB = require('./db/connect')
const authUser = require('./midddleware/auth')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/sherp', sherpRouter)



app.use(errorHandler)
app.use(notFound)

//routes
app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
  })

const start = async() => {
    try {
        await connectDB(process.env.CONNECTION_STRING)
        app.listen(port, console.log(`server dey listen for port: ${port}...`))
    } catch (error) {
        console.log(error)
    }
}




start()
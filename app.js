const express = require('express')
const cors = require ('cors')
const logger = require('morgan')
// const suggestionRoutes = require('./router/suggRouter')

const userRoutes = require('./router/userRouter')


const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))


app.get('/', (req, res) => {
    res.json({
        name: "QuizNight", 
        description: "Welcome to the QuizNight API"
    })
})

// app.use('/suggestions', suggestionRoutes)


module.exports = app;
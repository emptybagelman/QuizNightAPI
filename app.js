const express = require('express')
const cors = require ('cors')
const logger = require('morgan')
// const suggestionRoutes = require('./router/suggRouter')

const userRoutes = require('./router/userRouter')
const groupRoutes = require("./router/groupRouter")
const quizRoutes = require("./router/quizRouter")
const questionRoutes = require("./router/questionRouter")
const playerRoutes = require("./router/playerRouter")
const paRoutes = require("./router/paRouter")
const memberRoutes = require("./router/memberRouter")
const songRoutes = require("./router/songRouter")


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

app.use("/users", userRoutes)
app.use("/groups", groupRoutes)
app.use("/quiz",quizRoutes)
app.use("/questions",questionRoutes)
app.use("/players",playerRoutes)
app.use("/playeranswers",paRoutes)
app.use("/members",memberRoutes)
app.use("/songs",songRoutes)

module.exports = app;
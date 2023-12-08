const PlayerAnswer = require("../model/PlayerAnswer")

async function index(req,res){
    try {
        const allPA = await PlayerAnswer.getAll()
        res.status(200).json(allPA)
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
}

async function showId(req,res){
    try {
        const id = parseInt(req.params.id)
        const PA = await PlayerAnswer.getById(id)
        res.status(200).json(PA)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showAllUsers(req,res){
    try {
        const user_id = parseInt(req.params.user_id)
        const users = await PlayerAnswer.getAllByUserId(user_id)
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showAllQuestions(req,res){
    try {
        const question_id = parseInt(req.params.question_id)
        const data = await PlayerAnswer.getAllByQuestionId(question_id)
        res.status(201).json(data)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await PlayerAnswer.create(data)
    res.status(201).send({"Created successfully":result})
}

module.exports = {
    index , showId, showAllUsers, showAllQuestions, create
}
const Quiz = require("../model/Quiz")

async function index(req,res){
    try {
        const allQuizzes = await Quiz.getAll()
        res.status(200).json(allQuizzes)
    } catch (error) {
        res.status(502).json({"error":error.message})
    }
}

async function showId(req,res){
    try {
        const id = parseInt(req.params.id)
        const quiz = await Quiz.getById(id)
        res.status(200).json(quiz)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showGroupId(req,res){
    try {
        const groupId = parseInt(req.params.group_id)
        const quiz = await Quiz.getAllByGroupId(groupId)
        res.status(200).json(quiz)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showCreatorId(req,res){
    try {
        const creatorId = parseInt(req.params.creator_id)
        const quiz = await Quiz.getAllByCreatorId(creatorId)
        res.status(200).json(quiz)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function createQuiz(req,res){
    const data = req.body
    const result = await Quiz.create(data)
    res.status(201).send({"created successfully":result})
}

async function update(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const quizToUpdate = await Quiz.getById(id)
        const updatedQuizName = await quizToUpdate.update(data)
        res.status(201).json(updatedQuizName)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function destroy(req,res){
    try {
        const id = parseInt(req.params.id)
        const quizToDelete = await Quiz.getById(id)
        await quizToDelete.destroy()
        res.status(204)
    } catch (error) {
        res.status(404).send({"error":error.message})
    }
}


module.exports = {
    index, showId, showGroupId, showCreatorId, createQuiz, update, destroy
}
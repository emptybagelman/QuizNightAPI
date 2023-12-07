const Question = require("../model/Question")

async function index(req,res){
    try {
        const allQuestions = await Question.getAll()
        res.status(200).json(allQuestions)
    } catch (error) {
        res.status(502).json({"error":error.message})
    }
}

async function showId(req,res){
    try {
        const id = parseInt(req.params.id)
        const question = await Question.getById(id)
        res.status(200).json(question)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showQuizId(req,res){
    try {
        const quiz_id = parseInt(req.params.quiz_id)
        const questions = await Question.getAllByQuizId(quiz_id)
        res.status(200).json(questions)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showCategory(req,res){
    try {
        const category = req.params.category
        const questions = await Question.getAllByCategory(category)
        res.status(200).json(questions)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await Question.create(data)
    res.status(201).send({"Created successfully": result})
}

async function update(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const questionToUpdate = await Question.getById(id)
        const updatedQuestion = await questionToUpdate.update(data)
        res.status(201).json(updatedQuestion)
    } catch (error) {
        res.status(404).json({"error":error})
    }
}

async function destroy(req,res){
    try {
        const id = parseInt(req.params.id)
        const questionToDelete = await Question.getById(id)
        await questionToDelete.destroy()
        res.status(204).json({"deleted":questionToDelete})
    } catch (error) {
        res.status(404).send({"error":error.message})
    }
}

module.exports = {
    index, showId, showQuizId, showCategory, create, update, destroy
}
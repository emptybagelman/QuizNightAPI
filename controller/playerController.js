const Player = require("../model/Player")

async function index(req,res){
    try {
        const allPlayers = await Player.getAll()
        res.status(200).json(allPlayers)
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
}

async function showId(req,res){
    try {
        const id = parseInt(req.params.id)
        const player = await Player.getById(id)
        res.status(200).json(player)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showQuizId(req,res){
    try {
        const quiz_id = parseInt(req.params.quiz_id)
        const players = await Player.getAllByQuizId(quiz_id)
        res.status(200).json(players)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await Player.create(data)
    res.status(201).send({"Created successfully":result})
}

async function updateLocalScore(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const playerToUpdate = await Player.getById(id)
        const updatedPlayer = await playerToUpdate.updateLocalScore(data)
        res.status(201).json(updatedPlayer)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function destroy(req,res){
    try {
        const id = parseInt(req.params.id)
        const playerToDelete = await Player.getById(id)
        await playerToDelete.destroy()
        res.status(204).json({"deleted":playerToDelete})
    } catch (error) {
        res.status(404).send({"error":error.message})
    }
}

module.exports = {
    index, showId, showQuizId, create, updateLocalScore, destroy
}
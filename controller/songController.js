const Song = require("../model/Song")

async function index(req,res){
    try {
        const allSongs = await Song.getAll()
        res.status(200).json(allSongs)
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
}

async function showId(req,res){
    try {
        const id = parseInt(req.params.id)
        const Song = await Song.getById(id)
        res.status(200).json(Song)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await Song.create(data)
    res.status(201).send({"Created successfully":result})
}

module.exports = {
    index, showId, create
}
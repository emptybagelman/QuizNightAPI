const Member = require("../model/Member")

async function index(req,res){
    try {
        const allMembers = await Member.getAll()
        res.status(200).json(allMembers)
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
}

async function showId(req,res){
    try {
        const id = parseInt(req.params.id)
        const member = await Member.getById(id)
        res.status(200).json(member)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showGroupId(req,res){
    try {
        const group_id = parseInt(req.params.group_id)
        const members = await Member.getAllByGroupId(group_id)
        res.status(200).json(members)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await Member.create(data)
    res.status(201).send({"Created successfully":result})
}

async function updateNickname(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const memberToUpdate = await Member.getById(id)
        const updatedMember = await memberToUpdate.updateNickname(data)
        res.status(201).json(updatedMember)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function updateTotalScore(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const memberToUpdate = await Member.getById(id)
        const updatedMember = await memberToUpdate.updateTotalScore(data)
        res.status(201).json(updatedMember)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function destroy(req,res){
    try {
        const id = parseInt(req.params.id)
        const memberToDelete = await Member.getById(id)
        await memberToDelete.destroy()
        res.status(204).json({"deleted":memberToDelete})
    } catch (error) {
        res.status(404).send({"error":error.message})
    }
}

module.exports = {
    index, showId, showGroupId, create, updateNickname, updateTotalScore, destroy
}
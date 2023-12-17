const bcrypt = require("bcrypt")

const Group = require("../model/Group")
const GroupToken = require("../model/GroupToken")

async function index(req,res) {
    try {
        const allGroups = await Group.getAll()
        res.status(200).json(allGroups)
    } catch (error) {
        res.status(502).json({"error":error.message})
    }
}

async function indexToken(req,res){
    try {
        const tokens = await GroupToken.getAllTokens();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function showId(req,res) {
    try {
        const id = parseInt(req.params.id)
        const group = await Group.getById(id)
        res.status(200).json(group)

    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showName(req,res) {
    try {
        const name = req.params.name
        const group = await Group.getByName(name)
        res.status(200).json(group)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showCreator(req,res) {
    try {
        const creator = req.params.group_creator
        const group = await Group.getByCreatorId(creator)
        res.status(200).json(group)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function showUserGroups(req,res){
    try {
        const user_id = parseInt(req.params.user_id)
        const groups = await Group.getByMemberId(user_id)
        res.status(200).json(groups)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function createGroup (req, res) {
    const data = req.body; 
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

    data.password = await bcrypt.hash(data.password, salt)

    const result = await Group.create(data)

    res.status(201).send(result)
}

async function joinGroup (req, res) {
    const data = req.body;
    try {
        const group = await Group.getByName(data.group_name)
        const authenticated = await bcrypt.compare(data.password, group.password)

        if (!authenticated) {
            throw new Error('Wrong credentials')
        } else {
            const token = await GroupToken.create(group.id)
            res.status(200).json({authenticated: true, token: token.token})
        }
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = {
    index, showId, showName, showCreator, showUserGroups, createGroup, joinGroup
}
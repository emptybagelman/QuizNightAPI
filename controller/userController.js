const bcrypt = require('bcrypt')

const User = require ('../model/User')
const Token = require('../model/Token');


async function index (req, res) {
    try {
        const allUsers = await User.getAll();
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function indexToken (req, res) {
    try {
        const tokens = await Token.getAllTokens();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function register (req, res) {
    const data = req.body; 
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

    data.password = await bcrypt.hash(data.password, salt)

    const result = await User.create(data)

    res.status(201).send(result)
}

async function login (req, res) {
    const data = req.body;
    try {
        const user = await User.getByUsername(data.username)
        const authenticated = await bcrypt.compare(data.password, user.password)

        if (!authenticated) {
            throw new Error('Wrong credentials')
        } else {
            const token = await Token.create(user.id)
            res.status(200).json({authenticated: true, token: token.token})
        }
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

async function destroy (req, res) {
    try {
        const id = req.params.user_id
        const tokenToDelete = await Token.getByUserId(id)
        await tokenToDelete.destroy()
        res.sendStatus(204)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}

async function show (req, res) {
    try {
        const id = req.params.user_id
        const token = await Token.getByUserId(id)
        res.status(200).json(token)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    register, login, index, indexToken, destroy, show
}

const { v4: uuidv4 } = require("uuid");

const db = require('../database/connect')

class Token {
    constructor({id, user_id, token}) {
        this.id = id;
        this.user_id = user_id;
        this.token = token
    }
    
    static async getAllTokens () {
        const response = await db.query('SELECT * FROM tokens')
        return response.rows.map(t => new Token(t))
    }

    static async create (user_id) {
        const token = uuidv4()
        const response = await db.query('INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING *', [user_id, token])
        const newId = response.rows[0].id
        const newToken = await Token.getById(newId)
        return newToken
    }

    static async getById(id) {
        const response = await db.query("SELECT * FROM tokens WHERE id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getByUserId (user_id) {
        const response = await db.query('SELECT * FROM tokens WHERE user_id = $1', [user_id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token by user_id.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getByToken(token) {
        const response = await db.query("SELECT * FROM tokens WHERE token = $1", [token]);
        if (response.rows.length < 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    async destroy() {
        const response = await db.query ('DELETE FROM tokens WHERE user_id=$1 RETURNING *', [this.user_id])
        return new Token(response.rows[0])
    }
}

module.exports = Token;

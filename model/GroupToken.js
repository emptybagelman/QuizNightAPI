const { v4: uuidv4 } = require("uuid")

const db = require("../database/connect")

class GroupToken {
    constructor({id,group_id,token}){
        this.id = id
        this.group_id = group_id
        this.token = token
    }

    static async getAllTokens () {
        const response = await db.query('SELECT * FROM grouptokens')
        return response.rows.map(t => new GroupToken(t))
    }

    static async create (group_id) {
        const token = uuidv4()
        const response = await db.query('INSERT INTO grouptokens (group_id, token) VALUES ($1, $2) RETURNING *', [group_id, token])
        const newId = response.rows[0].id
        const newToken = await GroupToken.getById(newId)
        return newToken
    }
    static async getById(id) {
        const response = await db.query("SELECT * FROM grouptokens WHERE id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new GroupToken(response.rows[0]);
        }
    }
    static async getByUserId (group_id) {
        const response = await db.query('SELECT * FROM grouptokens WHERE group_id = $1', [group_id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token by group_id.");
        } else {
            return new GroupToken(response.rows[0]);
        }
    }

    static async getByToken(token) {
        const response = await db.query("SELECT * FROM grouptokens WHERE token = $1", [token]);
        if (response.rows.length < 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new GroupToken(response.rows[0]);
        }
    }

    async destroy() {
        const response = await db.query ('DELETE FROM grouptokens WHERE group_id=$1 RETURNING *', [this.group_id])
        return new GroupToken(response.rows[0])
    }
}

module.exports = GroupToken;
const db = require("../database/connect")

class Player {
    constructor({ id,user_id, quiz_id }){
        this.id = id
        this.user_id = user_id
        this.quiz_id = quiz_id
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM players;")
        return resp.rows.map(p => new Player(p))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM players WHERE id = $1;",[id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find player: ${this.user_id} in quiz: ${this.quiz_id}`)
        }
        return new Player(resp.rows[0])
    }

    static async getAllByQuizId(quiz_id){
        const resp = await db.query("SELECT * FROM players WHERE quiz_id = $1;",[quiz_id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find players from quiz: ${quiz_id}`)
        }
        return resp.rows.map(p => new Player(p))
    }

    static async create(data){
        const {user_id,quiz_id} = data
        const resp = await db.query("INSERT INTO players (user_id,quiz_id) VALUES ($1,$2) RETURNING id;",[user_id,quiz_id])
        const newId = resp.rows[0].id
        const newPlayer = await Player.getById(newId)
        return newPlayer
    }

    async destroy(){
        const resp = await db.query("DELETE FROM players WHERE id = $1 RETURNING *;",[this.id])
        return new Player(resp.rows[0])
    }
}

module.exports = Player;
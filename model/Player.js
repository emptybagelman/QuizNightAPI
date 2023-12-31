const db = require("../database/connect")

class Player {
    constructor({ id,member_id, quiz_id, local_score }){
        this.id = id
        this.member_id = member_id
        this.quiz_id = quiz_id
        this.local_score = local_score
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM players;")
        return resp.rows.map(p => new Player(p))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM players WHERE id = $1;",[id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find player: ${this.member_id} in quiz: ${this.quiz_id}`)
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

    static async getAllNamesByQuizId(quiz_id){
        const resp = await db.query("SELECT members.* FROM players JOIN members ON players.member_id = members.id WHERE players.quiz_id = $1;",[quiz_id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find members for quiz: ${quiz_id}`)
        }
        return resp.rows;
    }

    static async create(data){
        const {member_id,quiz_id,local_score} = data
        const resp = await db.query("INSERT INTO players (member_id,quiz_id,local_score) VALUES ($1,$2,$3) RETURNING id;",[member_id,quiz_id,local_score])
        const newId = resp.rows[0].id
        const newPlayer = await Player.getById(newId)
        return newPlayer
    }

    async updateLocalScore(data){
        try {
            const { local_score } = data;
            const response = await db.query("UPDATE players SET local_score = $1 WHERE id = $2 RETURNING *;", [local_score, this.id]);
        
            if (response.rows.length === 0) {
              throw new Error(`Unable to update local_score for user with ID: ${this.id}. No rows were affected. Data may be malformed.`);
            }
            return new Player(response.rows[0]);
          } catch (error) {
            console.error('Error in updateLocalScore:', error);
            throw error;
          }
    }

    async destroy(){
        const resp = await db.query("DELETE FROM players WHERE id = $1 RETURNING *;",[this.id])
        return new Player(resp.rows[0])
    }
}

module.exports = Player;
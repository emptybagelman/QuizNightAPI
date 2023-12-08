const db = require("../database/connect")

class PlayerAnswer{
    constructor ({ id, user_id, question_id, answer }){
        this.id = id
        this.user_id = user_id
        this.question_id = question_id
        this.answer = answer
    }

    static async getAll(){
        const res = await db.query("SELECT * FROM playeranswers;")
        return res.rows.map(pa => new PlayerAnswer(pa))
    }

    static async getById(id){
        const res = await db.query("SELECT * FROM playeranswers WHERE id = $1;",[id])
        if(res.rows.length === 0){
            throw new Error (`Unable to find playeranswer with id: ${id}`)
        }
        return new PlayerAnswer(res.rows[0])
    }

    static async getAllByUserId(user_id){
        const res = await db.query("SELECT * FROM playeranswers WHERE user_id = $1;",[user_id])
        if(res.rows.length === 0){
            throw new Error (`Unable to find answers from user: ${user_id}`)
        }
        return res.rows.map(pa => new PlayerAnswer(pa))
    }

    static async getAllByQuestionId(question_id){
        const res = await db.query("SELECT * FROM playeranswers WHERE question_id = $1;",[question_id])
        if(res.rows.length === 0){
            throw new Error ( `Unable to find answers for question: ${question_id}`)
        }
        return res.rows.map(pa => new PlayerAnswer(pa))
    }

    static async create(data){
        const {user_id, question_id, answer} = data
        const res = await db.query("INSERT INTO playeranswers (user_id, question_id, answer) VALUES ($1, $2, $3) RETURNING id;",[user_id, question_id, answer])
        const newId = res.rows[0].id
        const newPA = await PlayerAnswer.getById(newId)
        return newPA;
    }
}

module.exports = PlayerAnswer
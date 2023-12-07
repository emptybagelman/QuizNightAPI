const db = require("../database/connect")

class Quiz {
    constructor({id,group_id,creator_id,quiz_name}) {
        this.id = id
        this.group_id = group_id
        this.creator_id = creator_id
        this.quiz_name = quiz_name
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM quizzes;")
        return resp.rows.map(q => new Quiz(q))
    }

    static async getById(id){
        const resp = await db.query('SELECT * FROM quizzes WHERE id = $1;', [id])
        if(resp.rows.length === 0){
            throw new Error ( `Unable to locate quiz with ID: ${id}`)
        }

        return new Quiz(resp.rows[0])
    }

    static async getAllByGroupId(group_id){
        const resp = await db.query("SELECT * FROM quizzes WHERE group_id = $1;",[group_id])
        if(resp.rows.length === 0){
            throw new Error (`Unable to locate quiz with Group ID: ${group_id}`)
        }
        return resp.rows.map(q => new Quiz(q))
    }

    static async getAllByCreatorId(creator_id){
        const resp = await db.query("SELECT * FROM quizzes WHERE creator_id = $1;",[creator_id])
        if(resp.rows.length === 0){
            throw new Error (`Unable to locate quiz with Group ID: ${creator_id}`)
        }
        return resp.rows.map(q => new Quiz(q))
    }

    static async create (data){
        const {group_id, creator_id, quiz_name} = data
        const resp = await db.query("INSERT INTO quizzes (group_id, creator_id, quiz_name) VALUES ($1, $2, $3) RETURNING id;",[group_id,creator_id,quiz_name])
        const newId = resp.rows[0].id
        const newQuiz = await Quiz.getById(newId)
        return newQuiz
    }

    async update (data){
        const resp = await db.query("UPDATE quizzes SET quiz_name = $1 WHERE id = $2 RETURNING *;",[data.quiz_name,this.id])
        if(resp.rows.length === 0){
            throw new Error (`Unable to find quiz with quiz_name; ${data.quiz_name}`)
        }
    }

    async destroy() {
        const resp = await db.query("DELETE FROM quizzes WHERE id = $1 RETURNING *;",[this.id])
        return new Quiz(resp.rows[0])
    }
}

module.exports = Quiz;
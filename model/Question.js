const db = require("../database/connect")

class Question {
    constructor({id,quiz_id,category,question,answer}) {
        this.id = id
        this.quiz_id = quiz_id
        this.category = category
        this.question = question
        this.answer = answer
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM questions;")
        return resp.rows.map(q => new Question(q))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM questions WHERE id = $1;",[id])
        if(resp.rows.length === 0){
            throw new Error (`Unable to find Question with ID: ${id}`)
        }
        return new Question(resp.rows[0])
    }

    static async getAllByQuizId(quiz_id){
        const resp = await db.query("SELECT * FROM questions WHERE quiz_id = $1;",[quiz_id])
        if(resp.rows.length === 0){
            throw new Error (`Unable to find Questions with quiz_id: ${quiz_id}`)
        }
        return resp.rows.map(q => new Question(q))
    }

    static async getAllByCategory(category){
        const resp = await db.query("SELECT * FROM questions WHERE category = $1;",[category])
        if(resp.rows.length === 0){
            throw new Error (`Unable to locate Questions with category: ${category}`)
        }
        return resp.rows.map(q => new Question(q))
    }

    static async create(data){
        const { quiz_id, category, question, answer } = data
        const resp = await db.query("INSERT INTO questions (quiz_id, category, question, answer) VALUES ($1,$2,$3,$4) RETURNING id;",[quiz_id,category,question,answer])
        const newId = resp.rows[0].id
        const newQuestion = await Question.getById(newId)
        return newQuestion
    }

    async update(data){
        const resp = await db.query("UPDATE questions SET category = $1, question = $2, answer = $3 WHERE id = $4 RETURNING *;",[data.category,data.question,data.answer,this.id])
        if(resp.rows.length === 0 ){
            throw new Error (`Unable to update question: ${this.id}. Data may be malformed.\n${data}`)
        }
    }

    async destroy(){
        const resp = await db.query("DELETE FROM questions WHERE id = $1 RETURNING *;",[this.id])
        return new Question(resp.rows[0])
    }
}

module.exports = Question;
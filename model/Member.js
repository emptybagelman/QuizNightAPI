const db = require("../database/connect")

class Member {
    constructor({ id, user_id, group_id, total_score, nickname}) {
        this.id = id
        this.user_id = user_id
        this.group_id = group_id
        this.total_score = total_score
        this.nickname= nickname
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM members;")
        return resp.rows.map(p => new Member(p))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM members WHERE id = $1;",[id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find player: ${this.user_id} in quiz: ${this.quiz_id}`)
        }
        return new Member(resp.rows[0])
    }

    static async getAllByGroupId(group_id){
        const resp = await db.query("SELECT * FROM members WHERE group_id = $1;",[group_id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find members from group: ${group_id}`)
        }
        return resp.rows.map(m => new Member(m))
    }

    static async create(data){
        const {user_id,group_id,total_score,nickname} = data
        const resp = await db.query("INSERT INTO members (user_id,group_id,total_score,nickname) VALUES ($1,$2,$3,$4) RETURNING id;",[user_id,group_id,total_score,nickname])
        const newId = resp.rows[0].id
        const newMember = await Member.getById(newId)
        return newMember
    }

    async updateNickname(data){
        try {
            const { nickname } = data;
            const response = await db.query("UPDATE members SET nickname = $1 WHERE id = $2 RETURNING *;", [nickname, this.id]);
        
            if (response.rows.length === 0) {
              throw new Error(`Unable to update nickname for user with ID: ${this.id}. No rows were affected. Data may be malformed.`);
            }
            return new Member(response.rows[0]);
          } catch (error) {
            console.error('Error in updateNickname:', error);
            throw error;
          }
    }

    async updateTotalScore(data){
        try {
            const { total_score } = data;
            const response = await db.query("UPDATE members SET total_score = $1 WHERE id = $2 RETURNING *;", [total_score, this.id]);
        
            if (response.rows.length === 0) {
              throw new Error(`Unable to update total_score for user with ID: ${this.id}. No rows were affected. Data may be malformed.`);
            }
            return new Member(response.rows[0]);
          } catch (error) {
            console.error('Error in updateScore:', error);
            throw error;
          }
    }

    async destroy(){
        const resp = await db.query("DELETE FROM members WHERE id = $1 RETURNING *;",[this.id])
        return new Member(resp.rows[0])
    }
}

module.exports = Member;
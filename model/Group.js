const db = require("../database/connect")

class Group {
    constructor({id, group_creator, group_name}) {
        this.id = id
        this.group_creator = group_creator
        this.group_name = group_name

    }

    static async getAll() {
        const resp = await db.query('SELECT * FROM groups')
        return resp.rows.map(g => new Group(g))
    }

    static async getById(id){
        const resp = await db.query('SELECT FROM groups WHERE id = $1', [id])
        if(resp.rows.length < 1){
            throw new Error ( `Unable to locate group with ID: ${id}`)
        }
        return new Group(resp.rows[0])
    }

    static async getByName(name){
        const resp = await db.query('SELECT FROM groups WHERE group_name = $1',[name])
        if(resp.rows.length < 1){
            throw new Error (`Unable to locate group with name: ${name}`)
        }
        return new Group(resp.rows[0])
    }
}
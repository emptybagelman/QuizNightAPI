const db = require("../database/connect")

class Group {
    constructor({id, group_creator, group_name, password}) {
        this.id = id
        this.group_creator = group_creator
        this.group_name = group_name
        this.password = password
    }

    static async getAll() {
        const resp = await db.query('SELECT * FROM groups;')
        return resp.rows.map(g => new Group(g))
    }

    static async getById(id){
        const resp = await db.query('SELECT * FROM groups WHERE id = $1;', [id])
        if(resp.rows.length === 0){
            throw new Error ( `Unable to locate group with ID: ${id}`)
        }

        return new Group(resp.rows[0])
    }

    static async getByCreatorId(group_creator){
        const resp = await db.query("SELECT * FROM groups WHERE group_creator = $1;",[group_creator])
        if(resp.rows.length === 0){
            throw new Error(`Unable to locate group with creator_id: ${group_creator}`)
        }
        return new Group(resp.rows[0])
    }

    static async getByName(name){
        const resp = await db.query('SELECT * FROM groups WHERE group_name = $1;',[name])
        if(resp.rows.length === 0){
            throw new Error (`Unable to locate group with name: ${name}`)
        }
        return new Group(resp.rows[0])
    }

    static async getByMemberId(user_id){
        const resp = await db.query("SELECT groups.* FROM groups JOIN members ON groups.id = members.group_id WHERE members.user_id = $1",[user_id])
        if(resp.rows.length === 0){
            throw new Error (`Unable to find groups where user: ${user_id} is a member.`)
        }
        return resp.rows.map(g => new Group(g))
    }

    static async create (data) {
        const {group_creator, group_name, password} = data;
        let response = await db.query('INSERT INTO groups (group_creator, group_name, password) VALUES ($1, $2, $3) RETURNING id', [group_creator, group_name, password])
        const newId = response.rows[0].id
        const newGroup = await Group.getById(newId)
        return newGroup
    }
}

module.exports = Group;
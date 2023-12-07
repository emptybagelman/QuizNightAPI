const db = require('../database/connect')

class User {
    constructor({id, username, password}) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM users')
        return response.rows.map(u => new User(u))
    }

    static async getById(id) {
        const response = await db.query('SELECT FROM users WHERE id = $1', [id]);
        if (response.rows.length != 1) {
            throw new Error ('Unable to locate user')
        }
        return new User(response.rows[0])
    }

    static async create (data) {
        const {username, password} = data;
        let response = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, password])
        const newId = response.rows[0].id
        const newUser = await User.getById(newId)
        return newUser
    }

    static async getByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    
}

module.exports = User;

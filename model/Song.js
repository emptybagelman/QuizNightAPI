const db = require("../database/connect")

class Song {
    constructor({ id, name, origin_url, capo, lines, chords, sidenotes }) {
        this.id = id
        this.name = name
        this.origin_url = origin_url
        this.capo = capo
        this.lines = lines
        this.chords = chords
        this.sidenotes= sidenotes
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM songs;")
        return resp.rows.map(s => new Song(s))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM songs WHERE id = $1;",[id])
        if(resp.rows.length === 0){
            throw new Error(`Unable to find player: ${this.user_id} in quiz: ${this.quiz_id}`)
        }
        return new Song(resp.rows[0])
    }

    static async create(data){
        const {name, origin_url, capo, lines, chords, sidenotes} = data
        const resp = await db.query("INSERT INTO songs (name, origin_url, capo, lines, chords, sidenotes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id;",[name, origin_url, capo, lines, chords, sidenotes])
        const newId = resp.rows[0].id
        const newSong = await Song.getById(newId)
        return newSong
    }
}

module.exports = Song;
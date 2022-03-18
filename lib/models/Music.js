const pool = require('../utils/pool');

module.exports = class Music {
    id;
    song;
    artist;
    genre;
    year;

    constructor(row) {
        this.id = row.id;
        this.song = row.song;
        this.artist = row.artist;
        this.genre = row.genre;
        this.year = row.year;
    }
static async insert({ song, artist, genre, year }) {
    const { rows } = await pool.query(
        `INSERT INTO 
        music
        (song, artist, genre, year)
        VALUES
        ($1, $2, $3, $4)
        RETURNING 
        *
        `,
        [song, artist, genre, year]
    );
    return new Music(rows[0]);
}

static async getById(id) {
    const { rows } = await pool.query(
        `SELECT
        *
        FROM
        music
        WHERE
        id=$1
        `,
        [id]
    );
    if (!rows[0]) return null
    return new Music(rows[0])
}
static async getAll() {
    const { rows } = await pool.query(
        `SELECT
        *
        FROM
        music
        `
    );
    return rows.map((row) => new Music(row));
}

static async updateById(id, { song, artist, genre, year }) {
    const existingMusic = await Music.getById(id)
    if(!existingMusic) return null 

    const newSong = song ?? existingMusic.song
    const newArtist = artist ?? existingMusic.artist
    const newGenre = genre ?? existingMusic.genre
    const newYear = year ?? existingMusic.year

    const { rows } = await pool.query(
        `UPDATE
        music
        SET
        song=$2,
        artist=$3,
        genre=$4,
        year=$5
        WHERE
        id=$1
        RETURNING
        *;`, 
        [id, newSong, newArtist, newGenre, newYear]
    );
    return new Music(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(
        `DELETE FROM
        music 
        WHERE
        id=$1
        RETURNING
        *`,
        [id]

    );
    if(!rows[0]) return null
    return new Music(rows[0]);
}

}
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

}
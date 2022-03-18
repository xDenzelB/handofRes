const pool = require('../utils/pool');

module.exports = class Movies {
    id;
    title;
    director;
    year;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.director = row.director;
        this.year = row.year;
    }

static async insert({ title, director, year}) {
    const { rows } = await pool.query(
        `INSERT INTO
        movies
        (title, director, year)
        VALUES
        ($1, $2, $3)
        RETURNING
        *
        `,
        [title, director, year]
    );
    return new Movies(rows[0]);
}

static async getById(id) {
    const { rows } = await pool.query(
        `SELECT
        *
        FROM
        movies
        WHERE
        id=$1
        `,
        [id]
    );
    if (!rows[0]) return null
    return new Movies(rows[0]);
}

static async getAll() {
    const { rows } = await pool.query(

        `SELECT
        *
        FROM 
        movies
        `
    );
    return rows.map((row) => new Movies(row));
}

static async updateById(id, { title, director, year}) {
    const existingMovie = await Movies.getById(id)
    if(!existingMovie) return null
    
    const newTitle = title ?? existingMovie.title
    const newDirector = director ?? existingMovie.director
    const newYear = year ?? existingMovie.year

    const { rows } = await pool.query(

        `UPDATE
        movies
        SET
        title=$2,
        director=$3,
        year=$4
        WHERE
        id=$1
        RETURNING
        *;
        `,
        [id, newTitle, newDirector, newYear]
    );
    return new Movies(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(

        `DELETE FROM
        movies
        WHERE
        id=$1
        RETURNING
        *
        `,
        [id]
    );
    if(!rows[0]) return null 
    return new Movies(rows[0]);
}

}
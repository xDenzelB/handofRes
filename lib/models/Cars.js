const pool = require('../utils/pool');

module.exports = class Cars {
    id;
    model;
    make;
    year;

    constructor(row) {
        this.id = row.id;
        this.model = row.model;
        this.make = row.make;
        this.year = row.year;
    }

    static async insert({ model, make, year }) {
        const { rows } = await pool.query(
            `INSERT INTO
            cars
            (model, make, year)
            VALUES
            ($1, $2, $3)
            RETURNING
            *
            `,
            [model, make, year]
        );
        return new Cars(rows[0]);
    }
}
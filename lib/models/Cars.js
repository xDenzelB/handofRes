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

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            cars
            WHERE
            id=$1
            `,
            [id]
        );
        if (!rows[0]) return null
        return new Cars(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
            *
            FROM
            cars
            `
        );
        return rows.map((row) => new Cars(row));
    }

    static async updateById(id, { model, make, year}) {
        const existingCar = await Cars.getById(id)
        if(!existingCar) return null 

        const newModel = model ?? existingCar.model
        const newMake = make ?? existingCar.make
        const newYear = year ?? existingCar.year

        const { rows } = await pool.query(
            `UPDATE
            cars
            SET
            model=$2,
            make=$3,
            year=$4
            WHERE
            id=$1
            RETURNING 
            *;
            `,
            [id, newModel, newMake, newYear]
        );
        return new Cars(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM
            cars
            WHERE
            id=$1
            RETURNING
            *`,
            [id]
        );
        if(!rows[0]) return null
        return new Cars(rows[0]);
    }
}
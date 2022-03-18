const pool = require('../utils/pool');

module.exports = class Pizza {
    id;
    crust;
    cheese;
    topping;

    constructor(row) {
        this.id = row.id;
        this.crust = row.crust;
        this.cheese = row.cheese;
        this.topping = row.topping;
    }

    static async insert({ crust, cheese, topping }) {
        const { rows } = await pool.query(
            `INSERT INTO
            pizza
            (crust, cheese, topping)
            VALUES
            ($1, $2, $3)
            RETURNING
            *
            `,
            [crust, cheese, topping]
        );
        return new Pizza(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            pizza
            WHERE
            id=$1
            `,
            [id]
        );
        if(!rows[0]) return null 
        return new Pizza(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            pizza
            `
        );
        return rows.map((row) => new Pizza(row));
    }

    static async updateById(id, { crust, cheese, topping }) {
        const existingPizza = await Pizza.getById(id)
        if(!existingPizza) return null 

        const newCrust = crust ?? existingPizza.crust
        const newCheese = cheese ?? existingPizza.cheese
        const newTopping = topping ?? existingPizza.topping 

        const { rows } = await pool.query(
            `UPDATE
            pizza
            SET
            crust=$2,
            cheese=$3,
            topping=$4
            WHERE
            id=$1
            RETURNING
            *;
            `,
            [id, newCrust, newCheese, newTopping]
        );
        return new Pizza(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM
            pizza
            WHERE
            id=$1
            RETURNING 
            *`,
            [id]
        );
        if(!rows[0]) return null 
        return new Pizza(rows[0]);
    }
}
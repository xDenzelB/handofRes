const beer = require('../controllers/beer');
const pool = require('../utils/pool');

module.exports = class Beer {
    id;
    type;
    hop;
    flavor;

    constructor(row) {
        this.id = row.id;
        this.type = row.type;
        this.hop = row.hop;
        this.flavor = row.flavor;
    }

static async insert({ type, hop, flavor }) {
    const { rows } = await pool.query(
        `INSERT INTO
        beer
        (type, hop, flavor)
        VALUES
        ($1, $2, $3)
        RETURNING 
        * `,
        [type, hop, flavor]
    );
    return new Beer(rows[0]);
}

static async getById(id) {
    const { rows } = await pool.query(
        `SELECT
        *
        FROM
        beer
        WHERE
        id=$1
        `,
        [id]
    );
    if(!rows[0]) return null
    return new Beer(rows[0]);
}

static async getAll() {
    const { rows } = await pool.query(
        `SELECT
        *
        FROM
        beer
        `
    );
    return rows.map((row) => new Beer(row));
}

static async updateById(id, { type, hop, flavor}) {
    const existingBeer = await Beer.getById(id)
    if(!existingBeer) return null 

    const newType = type ?? existingBeer.type
    const newHop = hop ?? existingBeer.hop
    const newFlavor = flavor ?? existingBeer.flavor

    const { rows } = await pool.query(
        `UPDATE
        beer
        SET
        type=$2,
        hop=$3,
        flavor=$4
        WHERE 
        id=$1
        RETURNING
        *;`,
        [id, newType, newHop, newFlavor]

    );
    return new Beer(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(
        `DELETE FROM 
        beer
        WHERE
        id=$1
        RETURNING 
        *`,
        [id]
    );
    if(!rows[0]) return null
    return new Beer(rows[0]);
}
}
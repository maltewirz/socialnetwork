const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/socialnetwork";

var db = spicedPg(dbUrl);

module.exports.addUser = function addUser(first, last, email, password) {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
        `,
        [first, last, email, password]
    );
};

module.exports.getEmailPassword = function getEmailPassword(email) {
    return db.query(
        `
        SELECT password, id
        FROM users
        WHERE email=$1;
        `,
        [email]
    );
};

module.exports.getUser = function getUser(id) {
    return db.query(
        `
        SELECT id, first, last, bio, pic_url
        FROM users
        WHERE id=$1;
        `, [id]
    );
};

module.exports.addImage = function addImage(url, id) {
    return db.query(`
        UPDATE users
        SET pic_url=($1)
        WHERE id=$2;
        `,[url, id]);
};

module.exports.addBio = function addBio(bio, id) {
    return db.query(`
        UPDATE users
        SET bio=($1)
        WHERE id=$2
        `, [bio, id]);
};

module.exports.lastUsers = function lastUsers() {
    return db.query(`
        SELECT id, first, last, pic_url
        FROM users
        ORDER BY created_at DESC
        LIMIT 3 ;
        `);
};

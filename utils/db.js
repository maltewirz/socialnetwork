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

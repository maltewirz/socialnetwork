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
        WHERE id=$2;
        `, [bio, id]);
};

module.exports.lastUsers = function lastUsers() {
    return db.query(`
        SELECT id, first, last, pic_url
        FROM users
        ORDER BY id DESC
        LIMIT 3 ;
        `);
};

module.exports.searchUsers = function searchUsers(currentQuery) {
    return db.query(`
        SELECT id, first, last, pic_url
        FROM users
        WHERE first ILIKE $1;
        `,[currentQuery + '%']);
};

module.exports.getUserRelation = function getUserRelation(myId, otherId) {
    return db.query(`
        SELECT * FROM friendships
        WHERE (sender_id=$1 AND receiver_id=$2)
        OR (sender_id=$2 AND receiver_id=$1);
        `, [myId, otherId]);
};
//
module.exports.deleteUserRelation = function deleteUserRelation(myId, otherId) {
    return db.query(`
        DELETE FROM friendships
        WHERE (sender_id=$1 AND receiver_id=$2)
        OR (sender_id=$2 AND receiver_id=$1);
        `, [myId, otherId]);
};
//
module.exports.acceptUserRelation = function acceptUserRelation(myId, otherId) {
    return db.query(`
        UPDATE friendships
        SET accepted = true
        WHERE sender_id=$2
        AND receiver_id=$1;
        `,[myId, otherId]);
};

module.exports.sendUserRelation = function sendUserRelation(myId, otherId) {
    return db.query(`
        INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2);
        `,[myId, otherId]);
};

module.exports.getFriendsWannabes = function getFriendsWannabes(myId) {
    return db.query(`
        SELECT users.id, first, last,  accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id);
        `, [myId]);
};

// SELECT users.id, first, last,  accepted
// FROM friendships
// JOIN users
// ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
// OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
// OR (accepted = true AND sender_id = $1 AND receiver_id = users.id);
//
// SELECT users.id, first, last,  accepted
// FROM friendships
// JOIN users
// ON (accepted = false AND sender_id  = 2 AND receiver_id = users.id)
// OR (accepted = true AND  sender_id = 2 AND receiver_id= users.id)
// OR (accepted = true AND  receiver_id= 2 AND  sender_id= users.id);

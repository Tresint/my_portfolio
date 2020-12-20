const mysql = require('mysql');


var db = mysql.createConnection({
    host : 'localhost',
    user : 'bloger',
    password : '1111',
    database : 'blog_db'
});

db.connect();

module.exports = db;
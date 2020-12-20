const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'bloger',
    password : '1111',
    database : 'blog_db'
});

connection.connect();

connection.end();
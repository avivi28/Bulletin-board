// get the client
const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DATABASE,
	password: process.env.MYSQL_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// with placeholder
function insertComment(comment) {
	pool.query(
		'INSERT INTO comment (comment) VALUES (?)',
		[comment]
		// function (err, results) {
		// 	// console.log(results);
		// }
	);
}

exports.insertComment = insertComment;

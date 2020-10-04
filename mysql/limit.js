const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ibm'
});

connection.query(
    `select * from dept limit ?`,
    [2],
    (err, result) => {
        if (err) throw err;
        console.log(result);
    }
);

connection.end();

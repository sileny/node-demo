const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ibm'
});

// select column_name(s) from table_name where column_name in (value1, value2, ...)
connection.query(
    'select * from dept where did in (?, ?)',
    [10, 30],
    (err, result) => {
        if (err) throw err;
        console.log(result);
    }
);

connection.end();

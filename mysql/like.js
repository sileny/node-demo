const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ibm'
});

// select column_name from dept where table_name like '%字符%'
connection.query(
    `select * from dept where location like '%?%'`,
    [20],
    (err, result) => {
        if (err) throw err;
        console.log(result);
    }
);

connection.end();

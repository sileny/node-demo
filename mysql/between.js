const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ibm'
});

// connection.query(
//     `insert into dept (did, dname, location) values (?, ?, ?)`,
//     [31, 'a31', 'location31'],
//     (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     }
// );

connection.query(
    `select * from dept where did between ? and ?`,
    [10, 30],
    (err, result) => {
        if (err) throw err;
        console.log(result);
    }
);

connection.end();

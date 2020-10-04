const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ibm'
});

connection.connect();

// 只有`sql, cb` --> query
connection.query('select * from dept', (err, result) => {
    if (err) throw err;
    console.log(result);
});

// // `sql, values, cb` --> insert
// connection.query(
//     'insert into dept(did, dname, location) values(?, ?, ?)',
//     [31, 'a31', 'location31'],
//     (err, result) => {
//         if (err) throw err;
//         // OkPacket {fieldCount: 0, affectedRows: 1, insertId: 31, serverStatus: 2, warningCount: 0, message: '', protocol41: true, changedRows: 0 }
//         console.log(result);
//     }
// );

// `sql, values, cb` --> update
connection.query(
    `update dept set did = ?, location = ? where dname = ?`,
    [31, 'location31', 'a33'],
    (err, result) => {
        if (err) throw err;
        // OkPacket {fieldCount: 0, affectedRows: 0, insertId: 0, serverStatus: 34, warningCount: 0, message: '(Rows matched: 0  Changed: 0  Warnings: 0', protocol41: true, changedRows: 0 }
        console.log(result);
    }
);

connection.query(
    `delete from dept where did = 31`,
    (err, result) => {
        if (err) throw err;
        // OkPacket {fieldCount: 0, affectedRows: 1, insertId: 0, serverStatus: 2, warningCount: 0, message: '', protocol41: true, changedRows: 0 }
        console.log(result);
    }
);

connection.end();

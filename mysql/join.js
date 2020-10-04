const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ibm'
});

connection.query(
    `select dept.did, dept.location, emp.salary from dept, emp where dept.did = emp.eid`,
    (err, result) => {
        if (err) throw err;
        console.log(result);
    }
);

connection.end();
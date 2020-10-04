const fs = require('fs');

fs.readFile('./temp/readFile.txt', (err, data) => {
    if (err) throw err;
    console.log(`读取到的内容为：${data}`);
});

fs.readFile('./temp/readFile.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(`读取到的内容为：${data}`);
});

const syncResult = fs.readFileSync('./temp/readFile.txt');
console.log(syncResult);

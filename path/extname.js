const path = require('path');

// path.extname获取后缀名
console.log(`${path.extname('/user/local/app/index.js')}`);
console.log(`${path.extname('/user/local/app/index')}`);
console.log(`${path.extname('/user/local/app/index.json')}`);
console.log(`${path.extname('/user/local/app/index.html')}`);
const zlib = require('zlib');
const fs = require('fs');

// 压缩
const gzip = zlib.createGzip();
const input = fs.createReadStream('./input.txt');
const output = fs.createWriteStream('./output.txt.gz');

input.pipe(gzip).pipe(output);

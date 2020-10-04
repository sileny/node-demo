const zlib = require('zlib');
const fs = require('fs');

// 解压缩
const gun = zlib.createGunzip();
const inputFile = fs.createReadStream('./output.txt.gz');
const outputFile = fs.createWriteStream('./output-gun.txt');

inputFile.pipe(gun).pipe(outputFile);

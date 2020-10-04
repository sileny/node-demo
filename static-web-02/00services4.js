//fs模块
let fs = require('fs');

let mimeModel = require('./model/getmimefromfile.js');
console.log(mimeModel.getMime(fs, '.css'));

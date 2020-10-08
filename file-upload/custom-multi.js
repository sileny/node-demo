const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');

// 1、创建文件夹
let createFolder = function (uploadFolder) {
    try {
        fs.accessSync(uploadFolder);
    } catch (e) {
        fs.mkdirSync(uploadFolder);
    }
};
let uploadFolder = './uploads/';
createFolder(uploadFolder);

// 2、创建存储方式
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 保存的路径，备注：需要自己创建
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        let name = file.originalname, ext = '';
        if (!name) return;
        ext = name.match(/\.\w+$/g)[0];
        console.log(file);
        name = name.replace(/\s+/g, '').replace(new RegExp(ext), '');
        cb(null, name + '-' + Date.now() + ext);
    }
});

// 3、配置存储方式
let upload = multer({
    storage: storage
});

// 4、接收文件
// Accept an array of files, all with the name fieldname.
// Optionally error out if more than maxCount files are uploaded.
// The array of files will be stored in req.files.
// 该例上传的文件超过2个会报错。上传的文件会保存到`req.files`字段里
app.post('/upload-multi', upload.array('multi', 2), (req, res, next) => {
    res.send('multi upload succeed');
});

app.get('/', (req, res, next) => {
    let form = fs.readFileSync('./custom-multi.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
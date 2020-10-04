// https://github.com/mscdex/busboy#busboy-methods
const express = require('express');
const app = express();

const fs = require('fs');
const multer = require('multer');

// 1、创建文件夹
let createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
let uploadFolder = './uploads/';
createFolder(uploadFolder);

// 2、配置自定义存储属性
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 保存的路径，备注：需要自己创建
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        let name = file.originalname, ext = '';
        if (!name) return;
        ext = name.match(/\.\w+$/g)[0];
        name = name.replace(/\s+/g, '').replace(new RegExp(ext), '');
        cb(null, name + '-' + Date.now() + ext);
    }
});

// 3、实例化
let upload = multer({storage: storage});

// 4、配置路由
app.post(
    '/multi-fields',
    upload.fields([{name: 'field1', maxCount: 2}, {name: 'field2', maxCount: 3}]),
    (req, res, next) => {
        console.log(req.files);
        res.send('multi fields succeed');
    }
);

app.get('/', (req, res, next) => {
    let form = fs.readFileSync('./multi-fields.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);
// 后端(node.js) upload.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const multer = require('multer');

// 1、创建目录
let createFolder = function (uploadFolder) {
    try {
        fs.accessSync(uploadFolder);
    } catch (e) {
        fs.mkdirSync(uploadFolder);
    }
};
let uploadFolder = './uploads/';
createFolder(uploadFolder);

// 2、自定义存储目录与文件名
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        let name = file.originalname, ext = '';
        if (!name) return;
        ext = name.match(/\.\w+$/g)[0];
        console.log(file);
        name = name.replace(/\s+/g, '').replace(new RegExp(ext), '');
        cb(null, name + '-' + Date.now() + ext);
    }
});

// 3、配置存储属性
let upload = multer({storage: storage});

// 页面渲染
app.get('/', function (req, res) {
    let form = fs.readFileSync('./protosomatic-upload.html', {encoding: 'utf8'});
    res.send(form);
});

// 4、对应前端的上传接口 http://127.0.0.1:3000/upload, upload.any() 过滤时不对文件列表格式做任何特殊处理
app.post('/upload', upload.any(), function (req, res) {
    console.log(req.files);
    res.send({message: '上传成功'})
});

app.listen(3000, '127.0.0.1', () => console.log(`server is running at 3000`));
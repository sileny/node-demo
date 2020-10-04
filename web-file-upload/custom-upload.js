const fs = require('fs');
const express = require('express');
const app = express();

const multer = require('multer');

// 1、如果文件夹不存在，直接写为`string`类型的路径会报错
let createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
let uploadFolder = './temps/';
createFolder(uploadFolder);

// 2、自定义文件存储
let storage = multer.diskStorage({
    // destination is used to determine within which folder the uploaded files should be stored.
    // This can also be given as a string (e.g. '/tmp/uploads').
    // If no destination is given, the operating system's default directory for temporary files is used.
    destination: function (req, file, cb) {
        // 保存的路径，备注：需要自己创建
        // 设置存储的目录(如果文件夹不存在，直接写为`string`类型的路径会报错)
        cb(null, uploadFolder/*'./temps'*/);
    },
    // filename is used to determine what the file should be named inside the folder.
    // If no filename is given, each file will be given a random name that doesn't include any file extension
    filename: function (req, file, cb) {
        console.log(file);
        // 获取文件扩展名
        let name = file.originalname.match(/\.\w+$/g);
        if (name) name = name[0];
        // 设置文件名
        cb(null, file.fieldname + '-' + Date.now() + name);
    }
});

// 3、配置属性
const upload = multer({storage: storage});

// 单个文件上传
app.get('/', (req, res, next) => {
    // 读取页面
    let form = fs.readFileSync('./custom-upload.html', {encoding: 'utf8'});
    // 渲染页面内容
    res.send(form);
});

// 4、post路由
app.post('/custom-upload', upload.single('custom'), (req, res, next) => {
    res.send('custom upload succeed');
});

app.listen(3000, 'localhost', () => console.log('server is running at port 3000'));

/*
// http://www.jb51.net/article/97804.htm
var fs = require('fs');
var express = require('express');
var multer = require('multer')
 
var app = express();
 
var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
 
var uploadFolder = './upload/';
 
createFolder(uploadFolder);
 
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);  // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + '-' + Date.now());
  }
});
 
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })
 
// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
  var file = req.file;
  res.send({ret_code: '0'});
});
 
app.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
});
 
app.listen(3000);
*/

// form.html
// <form action="/upload" method="post" enctype="multipart/form-data">
//   <h2>单图上传</h2>
//   <input type="file" name="logo">
//   <input type="submit" value="提交">
// </form>
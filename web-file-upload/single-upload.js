const fs = require('fs');
const express = require('express');
const app = express();

const multer = require('multer');
// Multer accepts an options object, the most basic of which is the dest property,
// which tells Multer where to upload the files.
// In case you omit the options object, the files will be kept in memory and
// never written to disk

// 在一般的Web应用中，只有dest选项需要设置(看源码，该选项表示存储到磁盘里)
// function Multer (options) {
//   if (options.storage) {
//     this.storage = options.storage
//   } else if (options.dest) {
//     this.storage = diskStorage({ destination: options.dest })
//   }
//   ...
// }
const upload = multer({dest: 'uploads/'});

// 单图上传
// multerInstance.single(fieldName)
// Accept a single file with the name fieldname.
// The single file will be stored in req.file
// singleFiled对应于`single-upload.html`的`input[name=singleField]`
app.post('/upload-single', upload.single('singleField'), (req, res, next) => {
    console.log(req.file);
    res.send({statusCode: 0});
    /**
     * By default, Multer will rename the files so as to avoid naming conflicts.
     * The renaming function can be customized according to your needs.
     * 虽然实现了文件上传，但是上传的文件是没有后缀名的
     * filename is used to determine what the file should be named inside the folder.
     * If no filename is given, each file will be given a random name that doesn't include any file extension.
     * 这一般不符合需求。如，需要自定义保存文件(保存的路径是xx;保存的文件名是yyy)
     */
});

// 渲染页面
app.get('/form', (req, res, next) => {
    // 读取页面
    let form = fs.readFileSync('./single-upload.html', {encoding: 'utf8'});
    // 渲染页面
    res.send(form);
});

app.listen(3000);
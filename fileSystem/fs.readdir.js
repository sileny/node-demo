const fs = require('fs');

fs.readdir('./temp', (err, files) => {
    if (err) throw err;
    // 目录读取成功，读取到的文件夹：appendFile.txt,hello.txt,readFile.txt,watch.txt,world.txt,writeFile.txt,writeFileTest.txt
    // console.log(`目录读取成功，读取到的文件夹：${files}`);
    files.forEach((value, index, array) => {
        console.log(`文件名称：${value}`);
        // 读取文件的状态
        fs.stat('./temp/' + value, (err, stats) => {
            if (err) throw err;
            // stats.mode为33206则表示当前是文件
            // stats.mode为16822则表示当前是文件夹
            // console.log(stats);
            switch (stats.mode) {
                case 16822:
                    console.log(`文件夹`);
                    break;
                case 33206:
                    console.log(`文件`);
                    break;
                default:
                    console.log(`其他`);
                    break;
            }
        });
    });

    // // 或者下面的递归
    // let dirs = [];
    // (function getFile(i) {
    //     // 停止获取
    //     if (i === files.length) {
    //         console.log(dirs);
    //         return;
    //     }
    //
    //     let file = files[i];
    //     fs.stat('./temp/' + file, function (err, stats) {
    //         if (err) throw err;
    //         if (stats.isDirectory()) dirs.push(file);
    //
    //         // 继续获取
    //         getFile(i + 1);
    //     });
    // })(0);
});
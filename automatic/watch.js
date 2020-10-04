const fs = require('fs');

// 源文件目录
const srcDir = './test/source';

/**
 * 监听source文件夹下的文件的改变，然后读取全部文件，合并文件
 */
// 1、监听文件夹
fs.watch(srcDir, (eventType, filename) => {
    // 这里不需要对filename进行判断(删除filename也会触发rename)
    // 只需要针对不同的事件进行处理即可

    // 2、读取文件夹下的全部文件
    fs.readdir(srcDir, (err, files) => {

        const contentArr = [];
        files.forEach(file => {

            // 判断文件类型是否为js，因为file参数可能不是js文件，也不是css文件类型
            if (!(/\.js$/.test(file))) return;
            // 3、读取文件状态
            fs.stat(srcDir + '/' + file, (err, stats) => {
                switch (stats && stats.mode) {
                    case 16822:
                        break;
                    case 33206:
                        // 把为文件类型的文件路径放入数组
                        contentArr.push(srcDir + '/' + file);
                        break;
                }

                let content = '';
                // 4、读取文件内容
                contentArr.forEach(value => {
                    const res = fs.readFileSync(value);
                    content += res.toString() + '\n';
                });

                // 5、合并内容
                fs.writeFile('./test/js/all.js', content, 'utf8', err => {
                    if (err) throw err;
                    console.log('合并内容成功');
                });
            });
        });
    });
});
const fs = require('fs');

fs.readdir('./../', (error, files) => {
    if (error) throw error;
    const fileArray = [];
    (function getFile(i) {
        if (i < files.length) {
            fs.stat('./../' + files[i], (err, stats) => {
                if (err) throw err;
                if (stats.isDirectory()) {
                    fileArray.push(files[i]);
                }
                // 执行下一次
                getFile(i+1);
            })
        } else {
            console.log(fileArray);
        }
    })(0);
});

function getDirectory(path, callback) {
    fs.readdir(path, (error, files) => {
        if (error) throw error;
        const fileArray = [];
        (function getFile(i) {
            if (i < files.length) {
                fs.stat(path + files[i], (err, stats) => {
                    if (err) throw err;
                    if (stats.isDirectory()) {
                        fileArray.push(files[i]);
                    }
                    // 执行下一次
                    getFile(i+1);
                })
            } else {
                console.log(fileArray);
                callback(fileArray);
            }
        })(0);
    });
}

function getDirs(path, callback) {
    fs.readdir(path, (error, files) => {
        if (error) throw error;
        // const fileArray = [];
        let fileArray = files.filter(value => {
            let res = fs.statSync(path + value);
            return res.isDirectory();
        });
        console.log(fileArray);
        callback(fileArray);
    });
}

getDirs('./../');
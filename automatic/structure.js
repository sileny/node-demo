const projectData = {
    name: 'test',
    fileData: [{
        name: 'css',
        type: 'dir'
    }, {
        name: 'js',
        type: 'dir'
    }, {
        name: 'images',
        type: 'dir'
    }, {
        name: 'index.html',
        type: 'file',
        content: '<!doctype html>' +
        '\n' +
        '<html lang="en">' +
        '\n' +
        '<head>' +
        '\n' +
        '\t' +
        '<meta charset="UTF-8" />' +
        '\n' +
        '\t' +
        '<title>title</title>' +
        '\n' +
        '</head>' +
        '\n' +
        '<body>' +
        '\n' +
        '\n' +
        '</body>' +
        '\n' +
        '</html>'
    }]
};

const fs = require('fs');

/**
 * 根据对象属性创建项目, 项目配置都是同步的
 */
if (projectData.name) {
    // 1、创建文件夹 -- 工程项目文件夹
    const pathName = './' + projectData.name;
    fs.mkdirSync(pathName);

    // 2、根据fileData创建文件夹或文件
    const fileData = projectData.fileData;
    if (fileData && fileData.forEach) {

        fileData.forEach((value) => {

            value.path = projectData.name + '/' + value.name;

            switch (value.type) {
                // 创建文件夹
                case 'dir':
                    fs.mkdirSync(value.path);
                    break;
                // 创建文件 -- 复制内容
                case 'file':
                    fs.writeFileSync(value.path, value.content || '');
                    break;
                default:
                    break;
            }
        });
    }
}

const net = require('net');

const client = net.createConnection({
    host: 'localhost',
    port: 3000
}, () => {
    console.log('server is running at 3000 port');
});

client.on('connect', function () {
    console.log(arguments, 6);
});

client.on('data', function (data) {
    console.log(data, 'on data');
});

client.on('close', function (data) {
    console.log(data, 'on close');
});

client.on('end', function () {
    console.log('disconnected from server');
});

client.on('error', function (error) {
    console.log(error);
});

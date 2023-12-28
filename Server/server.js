const net = require('net');
const fs = require('fs');

const server = net.createServer(socket => {
    console.log('Client connected.');

    const writeStream = fs.createWriteStream('received_file.txt');

    socket.on('data', data => {
        writeStream.write(data);
    });

    socket.on('end', () => {
        console.log('File received.');
        writeStream.end();
    });

    socket.on('close', () => {
        console.log('Connection closed.');
    });

    socket.on('error', err => {
        console.error(`Socket error: ${err}`);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
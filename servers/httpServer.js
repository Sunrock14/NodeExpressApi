const http = require('http');


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');

    if(req.url === '/stop') {
        res.end('Stopping server...');
    }
    if(req.url === '/restart') {
        res.end('Restarting server...');
    }
    if(req.url === '/start') {
        res.end('Starting server...');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});  

function stopServer() {
    server.close(() => {
        console.log('Server stopped.');
    });
}
function restartServer() {
    stopServer();
    startServer();
}
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Ana sayfa için
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
    // Resimler için
    else if (req.url.startsWith('/img/')) {
        const imagePath = path.join(__dirname, req.url);
        fs.readFile(imagePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('Image not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(content);
        });
    }
    // 404 - Sayfa bulunamadı
    else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server http://localhost:${port} adresinde çalışıyor`);
});

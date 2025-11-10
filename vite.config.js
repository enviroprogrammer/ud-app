import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// set up private key and certificate for server
const options = {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem'),
};

// run app locally using HTTPS server
export default defineConfig({
    server: {
        https: createServer(options, (req, res) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('hello world\n');
        }).listen(8000)
    }
});
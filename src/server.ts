import app from './app.js'
import { Server } from "node:http";

let server: Server;

async function startServer() {
    server = app.listen(3000, () => {
        console.log(`Server started at http://localhost:3000`);
    });

    server.on('error', (error) => {
        console.error(`Veebiserveri käivitamine ebaõnnestus: ${error}`);
        process.exit(1);
    })
}

async function closeConnection() {
    if (server) {
        await new Promise(resolve => server.close(resolve));
    }
}

startServer().catch((error) => {
    console.error(`Veebiserveri käivitamine ebaõnnestus: ${error}`);
    closeConnection();
    process.exit(1);
})
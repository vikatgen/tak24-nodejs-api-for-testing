import app from './app.js'
import { Server } from "node:http";

let server: Server;
let port: number = process.env.PORT

async function startServer() {
    server = app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
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
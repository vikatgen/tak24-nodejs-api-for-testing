import app from './app.js'
import { Server } from "node:http";

const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server is running on http://localhost:${PORT}`);
});

let isShuttingDown = false;

async function shutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;

    setTimeout(() => process.exit(1), 8000);

    await new Promise(resolve => server.close(resolve));
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

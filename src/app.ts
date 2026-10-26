import express from 'express';
import {toNodeHandler} from "better-auth/node";
import { auth } from "./auth/auth.js"

const app = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use(express.static("public"));

export default app;
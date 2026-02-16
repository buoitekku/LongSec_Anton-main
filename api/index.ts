import express from "express";
import { attachRoutes } from "../server/routes.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

attachRoutes(app);

export default app;


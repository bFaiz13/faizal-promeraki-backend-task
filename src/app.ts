import "reflect-metadata";
import express from "express";
import partRoutes from "./routes/part.routes";

const app = express();
app.use(express.json());

app.use("/api/part", partRoutes);

export default app;

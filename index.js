import express from "express";
import cors from "cors";
import winston from "winston";
import basicAuth from "express-basic-auth";
import { authorize, authorizer } from "./controllers/auth.controller.js";
import clienteRouter from "./routes/cliente.routes.js";
import autorRouter from "./routes/autor.routes.js";
import livroRouter from "./routes/livro.routes.js";
import vendaRouter from "./routes/venda.routes.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "livraria-api.log" }),
  ],
  format: combine(label({ label: "livraria-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(basicAuth({ authorizeAsync: true, authorizer }));
app.get("/", (req, res) => {
  res.send("Bem-vindo a API de livraria!");
});
app.use("/cliente", clienteRouter);
app.use("/autor", authorize("admin"), autorRouter);
app.use("/livro", livroRouter);
app.use("/venda", vendaRouter);
app.use((err, req, res, next) => {
  if (err.message) {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
  } else {
    logger.error(`${req.method} ${req.baseUrl} - ${err}`);
    res.status(400).send({ error: err });
  }
});

export default app;

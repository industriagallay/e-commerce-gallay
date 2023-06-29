import express, { ErrorRequestHandler } from "express";
import mainRouter from "../src/routes/mainRouter";
import morgan from "morgan";
import path from "path";
import "dotenv/config";
import "./db";

const dirname = path.dirname(path.resolve());

const app = express();

// settings
app.set("port", process.env.PORT_NAME ?? 3001);
app.set("views", path.join(dirname, "views"));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(mainRouter);

// Error catching endware.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
};

app.use(errorHandler);

// static files
app.use(express.static(path.join(__dirname, "public")));

export default app;

import express, { Express } from "express";

import router from "./router";

import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import config from "./config";
import cors from "cors";

const app: Express = express();

if (config.mode === "development") {
  console.log("cors");
  const corsOptions: object = {
    origin: config.frontendURL,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", router);

app.listen(config.port, (err: string) => {
  if (err) {
    return console.error(err);
  }
  return console.log(
    `server is in ${config.mode} mode on http://localhost:${config.port}/`
  );
});

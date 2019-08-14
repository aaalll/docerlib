import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import routes from "./routes";
import { connectDb } from "./models";

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
routes(app);

app.mongo = connectDb();

export default app;

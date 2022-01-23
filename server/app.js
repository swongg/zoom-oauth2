import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { urlencoded, json } from "body-parser";
import router from "./routes";

// Create Express server
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// express config
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(json());
app.use(cookieParser());
app.use("/", router);
app.set("port", process.env.PORT || 8000);

export default app;

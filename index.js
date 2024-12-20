import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import PostRoutes from "./Posts/routes.js"
import MapProxyRoutes from "./MapProxy/routes.js";
import session from "express-session";
import "dotenv/config";
import cors from "cors";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/climb-circle"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000"
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
  }
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
PostRoutes(app);
MapProxyRoutes(app);
app.listen(process.env.PORT || 4000);
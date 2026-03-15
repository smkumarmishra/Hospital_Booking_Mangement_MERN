import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, "config", "config.env") });

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_ONE,
    process.env.DASHBOARD_URL,
  ].filter(Boolean),
);

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.has(origin)) return callback(null, true);
//       return callback(null, false);
//     },
//     methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);
export default app;

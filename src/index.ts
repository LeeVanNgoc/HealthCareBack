import express, { Request, Response } from "express";
import { connectDB } from "./configs/connectDB";
import doctorRoutes from "./routes/doctorRouter";
import userRoutes from "./routes/userRouter";
import dotenv from "dotenv";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import otpRoutes from "./routes/otpRouter";
dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const urlReact = process.env.URL_REACT || "http://localhost:3031";
app.use(function (req: Request, res: Response, next: Next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", urlReact);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app);
doctorRoutes(app);
otpRoutes(app);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

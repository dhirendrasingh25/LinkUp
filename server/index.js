import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRoute from "./routes/postRoutes.js";
import path from "path";
import NodeCache from "node-cache";

dotenv.config();

const app = express();
const nodeCache = new NodeCache({
  stdTTL: 60,
});

const PORT = process.env.PORT || 8008;

const __dirname = path.resolve(path.dirname(""));

async function dbConnection() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database Connected");
}
dbConnection().catch((err) => console.log(err));

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, "./views/build")));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

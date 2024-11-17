import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import { sequelize } from "./config/databaseConfig";
import adminRoutes from "./routes/adminRoutes";
import eventRoutes from "./routes/eventRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import newsRoutes from "./routes/newsRoutes";
import productRoutes from "./routes/productRoutes";
import teamRoutes from "./routes/teamRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4173";


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Authorization", "Content-Type"],
    optionsSuccessStatus: 200,
  })
);

app.use("/public", express.static("public"));

app.use("/admins", adminRoutes);
app.use("/events", eventRoutes);
app.use("/galleries", galleryRoutes);
app.use("/news", newsRoutes);
app.use("/products", productRoutes);
app.use("/team-members", teamRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

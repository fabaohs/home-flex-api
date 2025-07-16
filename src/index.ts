import express from "express";
import setupRoutes from "./routes/index.ts";
import { errorHandler } from "./middlewares/error-handler.ts";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", setupRoutes);
app.use("/health", (_, res) =>
  res.json({
    status: "ok",
    timestamp: new Date(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  })
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

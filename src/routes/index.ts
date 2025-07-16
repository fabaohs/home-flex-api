import { Router } from "express";
import { authRoutes } from "./auth.routes.ts";

const router = Router();

function setupRoutes() {
  router.use("/auth", authRoutes);

  return router;
}

export default setupRoutes();

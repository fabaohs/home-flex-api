import { Router } from "express";
import { AuthController } from "../features/auth/auth.controller.ts";

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", authController.login);

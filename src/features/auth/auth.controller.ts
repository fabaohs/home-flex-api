import { type NextFunction, type Request, type Response } from "express";
import { AuthService } from "./auth.service.ts";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return;
      }

      const cleanedPayload = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      await AuthService.login(cleanedPayload);

      return res.status(200).json({});
    } catch (e) {
      next(e);
    }
  }

  async me(req, res) {
    return await AuthService.me();
  }
}

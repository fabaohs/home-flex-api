import { AuthService } from "./auth.service";

export class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    return await AuthService.login({ email, password });
  }

  async me(req, res) {
    return await AuthService.me();
  }
}

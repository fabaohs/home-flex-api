import { type NextFunction, type Request, type Response } from "express";
import { AuthService } from "./auth.service.ts";
import { Ok } from "../../configs/success.ts";
import { SuccessResponses } from "../../shared/enums/success-responses.enum.ts";
import { BadRequest } from "../../configs/error.ts";
import { ErrorEnum } from "../../shared/enums/error-responses.enum.ts";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequest(
          ErrorEnum.BAD_INPUT,
          "Email e Senha são obrigatórios!"
        );
      }

      const cleanedPayload = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      const loggedUser = await AuthService.login(cleanedPayload);

      return new Ok(
        SuccessResponses.OK,
        loggedUser,
        "Usuário logado com sucesso!"
      );
    } catch (e) {
      next(e);
    }
  }

  async me(req, res) {
    return await AuthService.me();
  }
}

import { NotFound, Unauthorized } from "../../configs/error.ts";
import { ErrorEnum } from "../../shared/enums/error-responses.enum.ts";
import { AuthRepository } from "./auth.repository.ts";
import { compare } from "bcrypt";
import jwtUtils from "@utils/jwt-utils";

export class AuthService {
  static async login({ email, password }: { email: string; password: string }) {
    const user = await AuthRepository.findUserByMail(email);

    if (!user) {
      throw new Unauthorized(ErrorEnum.UNAUTHORIZED, "Usuário não encontrado");
    }

    const isSamePwd = await compare(password, user.password);

    if (!isSamePwd) {
      throw new Unauthorized(ErrorEnum.UNAUTHORIZED, "Senha incorreta");
    }

    const accessToken = jwtUtils.generateAccessToken({
      email: user.email,
      name: user.name,
      userId: user.id,
    });
    const refreshToken = jwtUtils.generateRefreshToken(user.id);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  static async me() {}
}

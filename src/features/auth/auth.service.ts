import { AuthRepository } from "./auth.repository.ts";

export class AuthService {
  static async login({ email, password }: { email: string; password: string }) {
    const user = await AuthRepository.findUserByMail(email);

    if (!user) {
      throw new Error("User not found");
    }
  }

  static async me() {}
}

import { eq } from "drizzle-orm";
import { db } from "../../configs/db.ts";
import { user } from "../../shared/entities/index.ts";

export class AuthRepository {
  private static readonly drizzle = db;

  static async findUserByMail(email: string) {
    return await this.drizzle.query.user.findFirst({
      where: eq(user.email, email),
    });
    // return await this.drizzle.select().from(user).where(eq(user.email, email));
  }
}

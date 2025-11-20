import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '../tables/users.table';
import { DrizzleAsyncProvider } from 'src/configurations/drizzle/db-provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ProfileEnum, Schema, schema } from '../tables/index';
import { eq } from 'drizzle-orm';
import { RegisterDto } from 'src/modules/auth/dto/authenticate.dto';

export interface IUserRepository {
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getUserEnterprise(
    userId: number,
  ): Promise<{ enterpriseId: number; profileId: ProfileEnum } | null>;
  create(registerDto: RegisterDto): Promise<User>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<Schema>,
  ) {}

  async getById(id: number): Promise<User | null> {
    try {
      return await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .then((result) => result[0]);
    } catch (error) {
      Logger.log('Error fetching user by ID:', error);
      throw new Error('Database error');
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      return await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .then((result) => result[0]);
    } catch (error) {
      Logger.log('Error fetching user by email:', error);
      throw new Error('Database error');
    }
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const { email, password, name, enterpriseId, profileEnum } = registerDto;
    try {
      const response = await this.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(schema.users)
          .values({
            email,
            password,
            name,
          })
          .returning();

        await tx.insert(schema.usersEnterprises).values({
          userId: user.id,
          enterpriseId,
          profileId: profileEnum,
        });

        return user;
      });

      return response;
    } catch (error) {
      Logger.log('Error creating user:', error);
      throw new Error('Database error');
    }
  }

  async getUserEnterprise(
    userId: number,
  ): Promise<{ enterpriseId: number; profileId: ProfileEnum } | null> {
    try {
      const result = await this.db
        .select()
        .from(schema.usersEnterprises)
        .where(eq(schema.usersEnterprises.userId, userId))
        .then((res) => res[0]);

      return result || null;
    } catch (error) {
      Logger.log('Error fetching user enterprise:', error);
      throw new Error('Database error');
    }
  }
}

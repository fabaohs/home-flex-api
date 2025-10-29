import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '../tables/users.table';
import { DrizzleAsyncProvider } from 'src/configurations/drizzle/db-provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Schema, schema } from '../tables/index';
import { eq } from 'drizzle-orm';

export interface IUserRepository {
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
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
}

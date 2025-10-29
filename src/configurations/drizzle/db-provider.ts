import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../shared/tables/index';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<NodePgDatabase<typeof schema>> => {
      const connectionString = configService.get<string>('DATABASE_URL');

      console.log('Connecting to database with URL:', connectionString);

      const pool = new Pool({
        connectionString,
        min: 2,
        max: 5,
      });

      return drizzle(pool, { schema });
    },
  },
];

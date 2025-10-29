export * from './users.table';
export * from './enterprises.table';
export * from './users-enterprises.table';

import { users } from './users.table';
import { enterprises } from './enterprises.table';
import { usersEnterprises } from './users-enterprises.table';

export const schema = { users, enterprises, usersEnterprises };
export type Schema = typeof schema;

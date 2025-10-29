export * from './users.table';

import { users } from './users.table';

export const schema = { users };
export type Schema = typeof schema;

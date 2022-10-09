/* eslint-disable @typescript-eslint/no-var-requires */
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
// import indexSchema from './schema.gql';
import querySchema from './resolvers/queries/queries.gql';
import mutationSchema from './resolvers/mutations/mutations.gql';
import indexSchema from './schema.gql';
import logger from './utils/logger';
// import mutationsSchema from './resolvers/mutations/mutations.gql';

const typeDefs = indexSchema.concat(querySchema, mutationSchema);
logger('info', typeDefs);
export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});

const querySchema = `
type Query {
  example(input:String!): String!
  getAuth(input:Credentials!): Tokens!
}`;

export default querySchema;

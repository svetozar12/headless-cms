const mutationSchema = `
type Mutation {
  createUser(input:Credentials!): User!
}`;

export default mutationSchema;

const indexSchema = `
 input Credentials {
    username: String!
    password: String!
  }

 type User {
    username: String!
    password: String!
  }
  
 type Tokens {
    accessToken: String!
    refreshToken: String!
  }`;

export default indexSchema;

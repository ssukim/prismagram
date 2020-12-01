require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hi",
  },
};
const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ PORT }, () => console.log(`Server runnin on http://localhost:${PORT}`));
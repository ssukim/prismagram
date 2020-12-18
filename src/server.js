import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }), 
  //resolver 사이에서 정보를 공유할 때
  //예를 들어, prisma를 resolver에서 import하지 않고 server.js에서 import
});

// server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ PORT }, () =>
  console.log(`✅ Server runnin on http://localhost:${PORT}`)
);

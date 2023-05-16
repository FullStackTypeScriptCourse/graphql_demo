// Apollo Server
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// Mongoose
import mongoose from 'mongoose';
import typeDefs from './graphql_schemas';
// Web Server
import http from 'http';
import body_parser_pkg from 'body-parser'; 
const { json } = body_parser_pkg;
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import usersRouter from './routes/userRoute';
// GraphQL
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import {Task} from './resolvers/resolverTypes';
// import { Task } from './resolvers/resolverTypes';
// Utils
import { userFromToken } from './utils';

dotenv.config();
// console.log('DB: ... :',process.env)

const app = express();

// Connect to MongoDB database
const DB = process.env.DATABASE_DEV!
.replace( '<password>', process.env.DATABASE_PASSWORD!)
.replace('<username>', process.env.DATABASE_USERNAME!)
.replace('<database>', process.env.DATABASE_NAME!);

mongoose.connect(DB, {
}).then(() => console.log('DB connection successful!'));

const httpServer = http.createServer(app);
const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Task,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// ApolloServerPluginDrainHttpServer is a plugin that will drain the httpServer when the ApolloServer is stopped. This is useful for ensuring that the server is not kept alive by the Node.js event loop. It is not necessary to use this plugin if we are using a different HTTP server, such as Express or Apollo Standalone Server: https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/.

await server.start();

app.use('/api/users',
cors<cors.CorsRequest>(),
json(), 
usersRouter);
console.log(`🚀 Users API ready at http://localhost:4000/api/users`);

app.use('/graphql', 
cors<cors.CorsRequest>(),
json(),
expressMiddleware(server, {
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || '';
    if (!token) {
      return { user: null };
    }
    console.log('TOKEN: ', token);
    // Try to retrieve a user with the token
    const user = await userFromToken(token);
    console.log('USER: ', user?.username);
    // Add the user to the context
    return { user };
  },
}));

app.get('*', function(req, res){
  res.send({ status: 404, message: 'Ressource not found' });
});

// top level await is now supported since typescript 3.8
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 GraphQL Server ready at http://localhost:4000/graphql`);
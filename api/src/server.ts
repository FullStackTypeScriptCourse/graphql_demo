// Apollo Server
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// Mongoose
import mongoose from 'mongoose';
// web server
import http from 'http';
import body_parser_pkg from 'body-parser'; 
const { json } = body_parser_pkg;
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
// Mongoose
import typeDefs from './graphql_schemas';
import Mutation from './resolvers/mutation';
import Query from './resolvers/query';
import Address from './resolvers/address';
import Person from './resolvers/person';

import usersRouter from './routes/users';
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
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Address,
    Person,
    Mutation,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// ApolloServerPluginDrainHttpServer is a plugin that will drain the httpServer when the ApolloServer is stopped. This is useful for ensuring that the server is not kept alive by the Node.js event loop. It is not necessary to use this plugin if we are using a different HTTP server, such as Express or Apollo Standalone Server: https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/.


await server.start();

app.use('/graphql', 
cors<cors.CorsRequest>(),
json(),
expressMiddleware(server, {}));

// top level await is now supported since typescript 3.8
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 GraphQL Server ready at http://localhost:4000/graphql`);

app.use('/api/users', usersRouter);
console.log(`🚀 Users API ready at http://localhost:4000/api/users`);

app.get('*', function(req, res){
  res.send({ status: 404, message: 'Ressource not found' });
});

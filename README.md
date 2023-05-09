# Simple GraphQL with both backend and frontend in react

## How to use
- Change the .env file to use the correct database. For this branch it is the `sample_training` database on Atlas Mongodb.
#### Backend
- From inside the api folder, run `npm install` and then `npm run dev` to start the server. Then in another terminal window, from inside the client folder, run `npm install` and then `npm run dev` to start the client.
- Open the browser and go to `http://localhost:4000/graphql` to see the GraphQL playground.
- Use the queries in the api/README.md file to test the API.
- Also a plain rest endpoint is available at `http://localhost:4000/api/users`. This is just to show case combining both GraphQL and REST endpoints in the same server.
- Changes are made to models/person.ts, resolvers/query and mutations and to the graphql_schemas.ts file in order to show case the use of GraphQL with mongoose. Provides a simple CRUD API for the Person model.

#### Frontend
- Open a new terminal and From inside the client folder, run `npm install` and then `npm run dev` to start the client.
- Open the browser and go to the local link provided by vite.
- Components:
  1. PersonTable
    - Shows a table of all the People on Atlas Mongodb in the database.
  2. PersonForm
    - Allows you to add a new Person to the database. And updates the table.

### Steps for building the backend with GraphQL and authentication
1. Create a login endpoint that returns a JWT token.
2. In the graphql endpoint add the JWT token to the context or unpack the token and add the user to the context.
3. Create a resolver that looks for the user in the context and if the user has the correct role, then allow the query or mutation to be executed otherwise throw an error.
4. To avoid having to check for user and roles in every resolver, create a decorator that can be used on the resolvers that require authentication and authorization.

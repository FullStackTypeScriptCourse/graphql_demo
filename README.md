# Simple GraphQL with both backend and frontend in react

## How to use
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

- Apollo client **cache update example** is shown in the `PersonForm` component. The cache is updated after an existing Person is updated.

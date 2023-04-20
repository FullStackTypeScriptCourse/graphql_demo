# Demo Project with GraphQL server and Apollo Client
The repo contains a GraphQL server and a client that uses Apollo Client to fetch data from the GraphQL server. These are placed in the api and client folders respectively.

## Tech Stack
- GraphQL server: Apollo Server
- Express server: Express
- Database: MongoDB and Mongoose
- GraphQL client: Apollo Client
- Frontend: Vite, React, Material UI

## How to use
#### Backend
- From inside the api folder, run `npm install` and then `npm run dev` to start the server. Then in another terminal window, from inside the client folder, run `npm install` and then `npm run dev` to start the client.
- Open the browser and go to `http://localhost:4000/graphql` to see the GraphQL playground.
- Use the queries in the api/README.md file to test the API.
- Also a plain rest endpoint is available at `http://localhost:4000/api/users`. This is just to show case combining both GraphQL and REST endpoints in the same server.

#### Frontend
- Open a new terminal and From inside the client folder, run `npm install` and then `npm run dev` to start the client.
- Open the browser and go to the local link provided by vite.
- Components:
  1. WithUseQuery: Uses the useQuery hook to fetch data from the GraphQL endpoint.
    - Has a dropdown to select Book Category
    - Has Cards to show the books in the selected category
    - Has Rating when clicked on the card
    - Rating posts a new rating to the GraphQL endpoint and updates the cache (and thereby the view)
  2. SimpleCards: Uses the Apollo Client in a simple way.


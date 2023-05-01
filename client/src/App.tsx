import { useState, useEffect } from 'react'
import './App.css'
// https://www.apollographql.com/docs/react/get-started
import { ApolloClient, InMemoryCache, ApolloProvider,  } from '@apollo/client';
import PostTable from './components/PostTable';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="flex justify-center flex-col">
          <PostTable/>
        </div>
      </ApolloProvider >
    </>
  )
}

export default App

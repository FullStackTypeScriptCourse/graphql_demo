import { useState, useEffect } from 'react'
import './App.css'
// https://www.apollographql.com/docs/react/get-started
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SimpleCards from './components/SimpleCards';
import WithUseQuery from './components/WithUseQuery';
import PersonTable from './components/PersonTable';
import PersonForm from './components/PersonForm';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="flex justify-center">
          <div className="w-1/2 flex justify-center bg-indigo-50 ">
            <div className="bg-indigo-50">
              <PersonTable />
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="bg-sky-50">
              <PersonForm />
            </div>
          </div>
        </div>
      </ApolloProvider >

      <hr />

    </>
  )
}

export default App

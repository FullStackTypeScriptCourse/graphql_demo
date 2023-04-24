import { useState, useEffect } from 'react'
import './App.css'
// https://www.apollographql.com/docs/react/get-started
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import PersonTable from './components/PersonTable';
import PersonForm from './components/PersonForm';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [person, setPerson] = useState({name:"",age:0})
  return (
    <>
      <ApolloProvider client={client}>
        <div className="flex justify-center">
          <div className="w-1/2 flex justify-center bg-indigo-50 ">
            <div className="bg-indigo-50">
              <PersonTable setPerson={setPerson}/>
            </div>
          </div>
          <div className="w-1/2 flex justify-center bg-sky-50">
            <div className="bg-sky-50">
              <PersonForm person={person} setPerson={setPerson}/>
            </div>
          </div>
        </div>
      </ApolloProvider >
    </>
  )
}

export default App

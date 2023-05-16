import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider,  } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
<BrowserRouter basename="math-app">
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
      </ApolloProvider >
  </React.StrictMode>,
)
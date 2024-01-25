
import React from 'react';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/react-hooks';
import Clients from './components/Clients';
// import { Query } from 'mongoose';

const cache = new InMemoryCache({
  typePolicies:{
    Query: {
      fields: {
        clients:{
          merge(existing, incoming){
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
});


// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache, 
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <Clients />
      </div>
      </ApolloProvider>
    </>

  );
}

export default App;

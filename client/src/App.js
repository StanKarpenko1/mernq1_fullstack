
import React from 'react';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/react-hooks';
import Clients from './components/Clients';
import AddClientsModule from './components/AddClientsModal';

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
         <AddClientsModule />
        <Clients />
      </div>
      </ApolloProvider>
    </>

  );
}

export default App;

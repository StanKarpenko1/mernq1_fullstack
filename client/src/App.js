
import React from 'react';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/react-hooks';
import Clients from './components/Clients';

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <Clients  />
      </div>
      </ApolloProvider>
    </>

  );
}

export default App;

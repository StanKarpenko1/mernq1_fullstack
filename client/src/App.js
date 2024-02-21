
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/Home';
import NotFound from './pages/NotFound'; 
import Project from './pages/Project';

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
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router> 
      </ApolloProvider>
    </>

  );
}

export default App;

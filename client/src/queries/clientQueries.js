import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
{
    clients{
      name
      id    
      email
      phone
    }
  }
`;

export {GET_CLIENTS}; 
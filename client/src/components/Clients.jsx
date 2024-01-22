import React from "react";
import {gql, useQuery} from "@apollo/client"

const GET_CLIENTS = gql`
{
    clients{
      name
      id
    }
  }
`;

export default function Clients() {

    const { loading, error, data } = useQuery (GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;
    return <> {!loading && !error && <h1>Clients</h1>} </>
}
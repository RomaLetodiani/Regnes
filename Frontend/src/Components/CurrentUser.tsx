// src/components/CurrentUser.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "@/GraphQL/Query/User.Queries";

const CurrentUser: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Current User</h1>
      <p>ID: {data.CurrentUser.id}</p>
      <p>Name: {data.CurrentUser.username}</p>
    </div>
  );
};

export default CurrentUser;

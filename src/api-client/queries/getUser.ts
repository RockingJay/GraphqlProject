import { gql } from '@apollo/client';

export const GET_CUSTOMER_QUERY = gql`
  query GetZellerCustomer($id: String!) {
    getZellerCustomer(id: $id) {
      id
      name
      email
      role
    }
  }
`;
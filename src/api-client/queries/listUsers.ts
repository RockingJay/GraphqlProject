import { gql } from "@apollo/client";

const LIST_USERS = gql`
  query ListZellerCustomers($filter: TableZellerCustomerFilterInput, $limit: Int, $nextToken: String) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
    }
  }
`;

export default LIST_USERS;
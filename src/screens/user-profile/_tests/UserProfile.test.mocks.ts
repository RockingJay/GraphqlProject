import { GET_CUSTOMER_QUERY } from "../../../api-client/queries/getUser";
import { mockUserData } from "./MockUserData";

export const mocks = [
  {
    request: {
      query: GET_CUSTOMER_QUERY,
      variables: {id: '1'},
    },
    result: {
      data: {
        getZellerCustomer: mockUserData,
      },
    },
  },
];
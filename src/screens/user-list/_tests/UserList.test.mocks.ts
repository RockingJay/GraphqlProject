
import LIST_USERS from '../../../api-client/queries/listUsers.ts';
import { mockUsers } from './MockUsersList.ts';


export const mocks = [
  {
    request: {
      query: LIST_USERS,
      variables: {
        filter: { role: { eq: 'ADMIN' } },
        limit: 100,
        nextToken: null,
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: mockUsers.filter(user => user.role === 'ADMIN'),
        },
      },
    },
  },
  {
    request: {
      query: LIST_USERS,
      variables: {
        filter: { role: { eq: 'MANAGER' } },
        limit: 100,
        nextToken: null,
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: mockUsers.filter(user => user.role === 'MANAGER'),
        },
      },
    },
  },
  {
    request: {
      query: LIST_USERS,
      variables: {
        filter: {
          or: [
            { name: { contains: 'Test Customer 1' } },
            { email: { contains: 'Test Customer 1' } },
          ],
        },
        limit: 10,
        nextToken: null,
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: mockUsers.filter(user => 
            user.name.toLowerCase().includes('test customer 1'.toLowerCase()) ||
            user.email.toLowerCase().includes('test customer 1'.toLowerCase())
          ),
        },
      },
    },
  },
];
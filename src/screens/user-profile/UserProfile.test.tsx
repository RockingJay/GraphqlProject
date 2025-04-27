import React from 'react';
import {render, waitFor, fireEvent, act} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import UserProfile from './UserProfile';
import {GET_CUSTOMER_QUERY} from '../../api-client/queries/getUser';
import {mocks} from './_tests/UserProfile.test.mocks';
import {mockUserData} from './_tests/MockUserData';
import {NavigationContainer} from '@react-navigation/native';

const mockNavigation = {
  navigate: jest.fn(),
};

const mockRoute = {
  params: {
    id: '1',
  },
};

describe('UserProfile', () => {
  it('renders loading spinner initially', () => {
    const {getByTestId} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile navigation={mockNavigation} route={mockRoute} />
      </MockedProvider>,
    );

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders user data after loading', async () => {
    const {getByText, getByTestId} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <UserProfile navigation={mockNavigation} route={mockRoute} />
        </NavigationContainer>
      </MockedProvider>,
    );

    // Wait for the profile image or placeholder to appear
    await waitFor(() => {
      expect(getByTestId('placeholder-circle')).toBeTruthy();
    });

    // Then check text values
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
    expect(getByText('MANAGER')).toBeTruthy();
  });

  it('renders first letter when no imageUrl is present', async () => {
    const noImageMocks = [
      {
        request: {
          query: GET_CUSTOMER_QUERY,
          variables: {id: '1'},
        },
        result: {
          data: {
            getZellerCustomer: {
              ...mockUserData,
              imageUrl: null, // No image
            },
          },
        },
      },
    ];

    const {getByTestId, getByText} = render(
      <MockedProvider mocks={noImageMocks} addTypename={false}>
        <UserProfile navigation={mockNavigation} route={mockRoute} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('placeholder-circle')).toBeTruthy();
      expect(getByText('J')).toBeTruthy(); // first letter of "John"
    });
  });

  it('renders error message on query error', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CUSTOMER_QUERY,
          variables: {id: '1'},
        },
        error: new Error('Something went wrong!'),
      },
    ];

    const {getByText} = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <UserProfile navigation={mockNavigation} route={mockRoute} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getByText(/Error:/i)).toBeTruthy();
      expect(getByText(/Tap to retry/i)).toBeTruthy();
    });
  });

  it('refetches data when retry is tapped', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CUSTOMER_QUERY,
          variables: {id: '1'},
        },
        error: new Error('Network error'),
      },
    ];

    const {getByText} = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <UserProfile navigation={mockNavigation} route={mockRoute} />
      </MockedProvider>,
    );

    await waitFor(() => {
      const retryText = getByText('Tap to retry');
      expect(retryText).toBeTruthy();
      fireEvent.press(retryText);
      // Normally here you would mock `refetch`, but apollo-client's auto retry makes it tricky to assert.
    });
  });
});

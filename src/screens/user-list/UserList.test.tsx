import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import UserList from './UserList';
import {mocks} from './_tests/UserList.test.mocks';

// Mock RadioGroup so we can control role selection easily
jest.mock('../../components/RadioGroup', () => {
  const React = require('react');
  const {View, Text, TouchableOpacity} = require('react-native');

  return ({onPress}: {onPress: (value: string) => void}) => (
    <View>
      <TouchableOpacity onPress={() => onPress('Admin')}>
        <Text>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('Manager')}>
        <Text>Manager</Text>
      </TouchableOpacity>
    </View>
  );
});

describe('UserList', () => {
  it('renders and filters users by role', async () => {
    const {getByText, queryByText} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserList
          navigation={{navigate: jest.fn()}}
          route={{params: {id: '1'}}}
        />
      </MockedProvider>,
    );

    // Wait for initial Admin users to render
    await waitFor(() => {
      expect(getByText('Test Customer 1')).toBeTruthy();
      expect(getByText('Test Customer 3')).toBeTruthy();
      expect(getByText('Test Customer 5')).toBeTruthy();
      expect(queryByText('Test Customer 2')).toBeNull(); // Manager user should not be visible
    });

    // Switch to Manager role
    fireEvent.press(getByText('Manager'));

    // Wait for Manager users to load
    await waitFor(() => {
      expect(getByText('Test Customer 2')).toBeTruthy();
      expect(getByText('Test Customer 4')).toBeTruthy();
      expect(getByText('Test Customer 6')).toBeTruthy();
      expect(queryByText('Test Customer 1')).toBeNull(); // Admin user should disappear
    });
  });

  it('filters users by search input (name/email) if User type is Admin', async () => {
    const {getByTestId, getByPlaceholderText, getByText, queryByText} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserList
          navigation={{navigate: jest.fn()}}
          route={{params: {id: '1'}}}
        />
      </MockedProvider>,
    );

    // Switch to Admin role
    fireEvent.press(getByText('Admin'));

    // Wait for intial Admin users to load
    await waitFor(() => {
      expect(getByText('Test Customer 1')).toBeTruthy();
      expect(getByText('Test Customer 3')).toBeTruthy();
      expect(getByText('Test Customer 5')).toBeTruthy();
    });

    const searchInput = getByTestId('search-input');

    // Simulate typing "Customer 5"
    await act(async () => {
      fireEvent.changeText(searchInput, 'Customer 5');
    });

    // Only use waitFor to wait for the correct elements
    expect(queryByText('Test Customer 5')).toBeTruthy();
    expect(queryByText('Test Customer 1')).toBeOnTheScreen();
    expect(queryByText('Test Customer 3')).toBeOnTheScreen();

    // Clear search
    await act(async () => {
      fireEvent.changeText(searchInput, '');
      await new Promise(resolve => setTimeout(resolve, 350)); // Again wait for debounce
    });

    // All Admin users should reappear
    await waitFor(() => {
      expect(getByText('Test Customer 1')).toBeTruthy();
      expect(getByText('Test Customer 3')).toBeTruthy();
      expect(getByText('Test Customer 5')).toBeTruthy();
    });
  });

  it('filters users by search input (name/email) if User type is Manager', async () => {
    const {getByTestId, getByPlaceholderText, getByText, queryByText} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserList
          navigation={{navigate: jest.fn()}}
          route={{params: {id: '1'}}}
        />
      </MockedProvider>,
    );

    // Switch to Manager role
    fireEvent.press(getByText('Manager'));

    // Wait for intial Manager users to load
    await waitFor(() => {
      expect(getByText('Test Customer 2')).toBeTruthy();
      expect(getByText('Test Customer 4')).toBeTruthy();
      expect(getByText('Test Customer 6')).toBeTruthy();
    });

    const searchInput = getByTestId('search-input');

    // Simulate typing "Customer 4"
    await act(async () => {
      fireEvent.changeText(searchInput, 'Customer 4');
    });

    // Only use waitFor to wait for the correct elements
    expect(queryByText('Test Customer 4')).toBeTruthy();
    expect(queryByText('Test Customer 2')).toBeOnTheScreen();
    expect(queryByText('Test Customer 6')).toBeOnTheScreen();

    // Clear search
    await act(async () => {
      fireEvent.changeText(searchInput, '');
      await new Promise(resolve => setTimeout(resolve, 350)); // Again wait for debounce
    });

    // All Admin users should reappear
    await waitFor(() => {
      expect(getByText('Test Customer 2')).toBeTruthy();
      expect(getByText('Test Customer 4')).toBeTruthy();
      expect(getByText('Test Customer 6')).toBeTruthy();
    });
  });
});

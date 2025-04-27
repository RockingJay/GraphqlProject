import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useQuery} from '@apollo/client';

import {
  ListZellerCustomersData,
  ListZellerCustomersVars,
  ZellerCustomer,
} from '../../types/typesList.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LIST_USERS from '../../api-client/queries/listUsers.ts';
import styles from './styles';

import RadioGroup from '../../components/RadioGroup.tsx';
import Divider from '../../components/Divider.tsx';
import UserItem from '../../components/UserItem.tsx';
import EmptyList from '../../components/EmptyList.tsx';
import {NavigationTypes} from '../../navigation/NavigationTypes.ts';

type Props = NativeStackScreenProps<NavigationTypes, 'UserList'>;

// Custom hook for debouncing a value
const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const UserList = ({route, navigation}: Props) => {
  const [userType, setUserType] = useState('Admin');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebouncedValue(searchQuery, 300);

  const {data, loading, error, refetch} = useQuery<
    ListZellerCustomersData,
    ListZellerCustomersVars
  >(LIST_USERS, {
    variables: {
      filter: {
        role: {
          eq: userType.toUpperCase(),
        },
      },
      limit: 100,
      nextToken: null,
    },
  });

  const filteredUsers = useMemo(() => {
    const users = data?.listZellerCustomers?.items || [];
    const query = debouncedQuery.toLowerCase();

    return users.filter(
      user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  }, [data, debouncedQuery]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({item}: {item: ZellerCustomer}) => (
    <UserItem item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        testID="search-input"
        data-testid="search-input"
        style={styles.searchInput}
        placeholder="Search by name or email..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <RadioGroup onPress={setUserType} />
      <Divider />

      <Text style={styles.subtitle}>{userType} Users</Text>

      {loading ? (
        <ActivityIndicator
          testID="loading-spinner"
          data-testid="loading-spinner"
          size="large"
          color="#3b82f6"
        />
      ) : error ? (
        <View>
          <Text style={styles.errorText}>Error: {error.message}</Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          testID="flat-list"
          data-testid="flat-list"
          data={filteredUsers}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <EmptyList message={`No ${userType} users found.`} />
          }
        />
      )}
    </View>
  );
};

export default UserList;

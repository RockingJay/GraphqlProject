import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {useQuery} from '@apollo/client';

import {ZellerCustomer} from '../../types/typesList.ts';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationTypes} from '../../navigation/NavigationTypes.ts';
import {GET_CUSTOMER_QUERY} from '../../api-client/queries/getUser.ts';

type Props = NativeStackScreenProps<NavigationTypes, 'UserProfile'>;

const UserProfile = ({route, navigation}: Props) => {
  const {id} = route.params;
  const {data, loading, error, refetch} = useQuery(GET_CUSTOMER_QUERY, {
    variables: {
      id: id,
    },
  });

  const userData = data?.getZellerCustomer as ZellerCustomer;

  const renderProfileImage = () => {
    if (userData?.imageUrl) {
      return (
        <Image
          testID="profile-image"
          source={{uri: userData?.imageUrl}}
          style={styles.profileImage}
        />
      );
    } else {
      const firstLetter = userData?.name.charAt(0).toUpperCase();
      return (
        <View testID="placeholder-circle" style={styles.placeholderCircle}>
          <Text style={styles.placeholderText}>{firstLetter}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.container}>
          {renderProfileImage()}
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Text style={styles.role}>{userData.role}</Text>
        </View>
      )}
    </View>
  );
};

export default UserProfile;

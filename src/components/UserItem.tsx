import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ZellerCustomer} from '../types/typesList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationTypes} from '../navigation/NavigationTypes';

type UserItemProps = {
  item: ZellerCustomer;
  navigation: NativeStackScreenProps<NavigationTypes, 'UserList'>['navigation'];
};

const UserItem = ({item, navigation}: UserItemProps) => {
  return (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => {
        navigation.navigate('UserProfile', {id: item.id});
      }}>
      <Text style={styles.initial}>{item.name.charAt(0)}</Text>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>
          {item.role.charAt(0).toUpperCase() + item.role.slice(1).toLowerCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {flexDirection: 'row', alignItems: 'center', marginBottom: 24},
  initial: {
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    marginRight: 12,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  name: {fontSize: 16, fontWeight: '600'},
  role: {fontSize: 14, color: '#555'},
});

export default UserItem;

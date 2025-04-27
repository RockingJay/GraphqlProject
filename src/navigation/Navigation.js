import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from '../screens/user-list/UserList';
import UserProfile from '../screens/user-profile/UserProfile';
import Notifications from '../screens/notifications/Notifications';
import Settings from '../screens/settings/Settings';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: true,
      }}>
      <Tab.Screen
        name={'Home'}
        options={() => {
          return {
            tabBarIcon: ({color}) => (
              <Icon size={28} name="home-outline" color={color} />
            ),
          };
        }}
        component={UserListStack}
      />
      <Tab.Screen
        name={'Notifications'}
        options={() => {
          return {
            tabBarIcon: ({color}) => (
              <Icon size={28} name="notifications-outline" color={color} />
            ),
          };
        }}
        component={Notifications}
      />
      <Tab.Screen
        name={'Settings'}
        options={() => {
          return {
            tabBarIcon: ({color}) => (
              <Icon size={28} name="settings-outline" color={color} />
            ),
          };
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const UserListStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserList" component={UserList} />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabStack"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'BottomTabStack'} component={BottomTabStack} />
      <Stack.Screen
        options={{headerShown: true, title: 'Profile'}}
        name="UserProfile"
        component={UserProfile}
      />
    </Stack.Navigator>
  );
}

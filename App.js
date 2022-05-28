import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginPage from './LoginPage';
import LoginDetailsPage from './LoginDetailsPage';
import PasswordResetPage from './PasswordResetPage';
import VerificationCodePage from './VerificationCodePage';
import NewPasswordPage from './NewPasswordPage';
import SuccessfulPasswordResetPage from './SuccessfulPasswordResetPage';
import ChatsPage from './ChatsPage';
import SearchPage from './SearchPage';
import SettingsPage from './SettingsPage';
import FriendsPage from './FriendsPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignUpPage from './SignUpPage';
import SignUpVerificationCodePage from './SignUpVerificationCodePage';
import SuccessfulSignUpPage from './SuccessfulSignUpPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function ChatsPageTab() {

  return (
    
    <Tab.Navigator
      screenOptions={({route})=> ({
        headerTransparent: true,
        headerTitle: " ",
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if(route.name==='SearchPage') {
            iconName = 'search';
            size = focused ? 25 : 20;;
          } else if (route.name==='ChatsPage') {
            iconName = 'comments';
            size = focused ? 25 : 20;
          } else if (route.name==='FriendsPage') {
            iconName = 'user-friends';
            size = focused ? 25 : 20;
          } else if (route.name==='SettingsPage') {
            iconName = 'cog';
            size = focused ? 25 : 20;
          }
          return (
            <FontAwesome5
              name = {iconName}
              size = {size}
              color = {color}
            />
          )
        }
      })
      }
      tabBarOptions={{
        activeTintColor: '#F4A836',
        inactiveTintColor: '#C9D4E3',
        activeBackgroundColor: '#275B9F',
        inactiveBackgroundColor: '#275B9F'
      }}
    >
      <Tab.Screen
      name="SearchPage"
      component={SearchPage} 
      options = {{tabBarLabel:"Search",}}/>
      <Tab.Screen
      name='ChatsPage'
      component={ChatsPage}
      options = {{tabBarLabel:"Chats",}}/>
      <Tab.Screen
      name="FriendsPage"
      component={FriendsPage}
      options = {{tabBarLabel:"Friends",}}/>
      <Tab.Screen
      name='SettingsPage'
      component={SettingsPage}
      options = {{tabBarLabel:"Settings",}}/>
    </Tab.Navigator>

    );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitle: " "
        }}
      >
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={({ navigation, route }) => ({
            headerShown: false
          })}
        />
        <Stack.Screen
          name="LoginDetailsPage"
          component={LoginDetailsPage}
        />

        <Stack.Screen
          name="PasswordResetPage"
          component={PasswordResetPage}
        />
        <Stack.Screen
          name="VerificationCodePage"
          component={VerificationCodePage}

        />
        <Stack.Screen
          name="NewPasswordPage"
          component={NewPasswordPage}
        />
        <Stack.Screen
          name="SuccessfulPasswordResetPage"
          component={SuccessfulPasswordResetPage}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
        />
        <Stack.Screen
          name="SignUpVerificationCodePage"
          component={SignUpVerificationCodePage}
        />
        <Stack.Screen
          name="SuccessfulSignUpPage"
          component={SuccessfulSignUpPage}
        />

        <Stack.Screen
          name="ChatsPage"
          component={ChatsPageTab}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
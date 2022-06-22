import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './LoginPage';
import LoginDetailsPage from './LoginDetailsPage';
import PasswordResetPage from './PasswordResetPage';
import SignUpPage from './SignUpPage';
import SuccessfulSignUpPage from './SuccessfulSignUpPage'
import MyProfilePage from './MyProfilePage';
import EditProfilePage from './EditProfilePage';
import { BottomTabNavi } from './BottomTabNavi';
import InnerChatsPage from './InnerChatsPage';

const Stack = createStackNavigator();

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
          name="SignUpPage"
          component={SignUpPage}
        />
        <Stack.Screen
          name="PasswordResetPage"
          component={PasswordResetPage}
        />
        <Stack.Screen
          name="SuccessfulSignUpPage"
          component={SuccessfulSignUpPage}
          options={({ navigation, route }) => ({
            headerShown: false
          })}
        />

        <Stack.Screen
          name="ChatsPage"
          component={BottomTabNavi}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="InnerChatsPage"
          component={InnerChatsPage}
        />
        
        <Stack.Screen
          name="MyProfilePage"
          component={MyProfilePage}
        />

        <Stack.Screen
          name="EditProfilePage"
          component={EditProfilePage}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
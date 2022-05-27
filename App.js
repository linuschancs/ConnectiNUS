import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginPage from './loginPage';
import LoginDetailsPage from './LoginDetailsPage';
import PasswordResetPage from './PasswordResetPage';
import VerificationCodePage from './VerificationCodePage';
import NewPasswordPage from './NewPasswordPage';
import SuccessfulPasswordResetPage from './SuccessfulPasswordResetPage';

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
          name="loginPage"
          component={loginPage}
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
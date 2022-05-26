import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginPage from './loginPage';
import ScreenB from './ScreenB';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   header: () => null
        // }}
      >
        <Stack.Screen
          name="loginPage"
          component={loginPage}
        // options={{
        //   header: () => null
        // }}
        />
        <Stack.Screen
          name="ScreenB"
          component={ScreenB}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
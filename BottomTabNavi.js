import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatsPage from './ChatsPage';
import SearchPage from './SearchPage';
import SettingsPage from './SettingsPage';
import FriendsPage from './FriendsPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

export function BottomTabNavi() {

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
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatsPage from './ChatsPage';
import SearchPage from './SearchPage';
import SettingsPage from './SettingsPage';
import FriendsPage from './FriendsPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Pressable,
  
} from 'react-native';
import {Dimensions, View, Text} from 'react-native';

const {width, height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export function BottomTabNavi({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate('MyProfilePage');
  }

    return (
      <Tab.Navigator
        screenOptions={({route})=> ({
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <Pressable onPress={onPressHandler}
            style={{
                position: 'absolute',
                padding: 5,
                right: 20,
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                width: 40,
                height:40,
                backgroundColor:'#fff',
                borderRadius:50,
                justifyContent: 'center',
                alignItems: 'center'
                }}
            >
            <FontAwesome5 name={"user"}  size={20} color="#01a699"/>
            </Pressable> 
        ),
          headerTintColor: '#01a699',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 20,
            right: 15,
            left: 15,
            borderRadius: 15,
            backgroundColor:"#FFFF",
            padding: 0,
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if(route.name==='SearchPage') {
              iconName = 'search';
              size = focused ? 25 : 20;
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
          inactiveTintColor: '#275B9F',
        }}
      >
        <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options = {{title: "Search", tabBarLabel:"Search", tabBarLabelStyle: {padding: 5}}}/>
        <Tab.Screen
        name='ChatsPage'
        component={ChatsPage}
        options = {{title: "Chats", tabBarLabel:"Chats", tabBarLabelStyle: {padding: 5}}}/>
        <Tab.Screen
        name="FriendsPage"
        component={FriendsPage}
        options = {{title: "Friends", tabBarLabel:"Friends", tabBarLabelStyle: {padding: 5}}}/>
        <Tab.Screen
        name='SettingsPage'
        component={SettingsPage}
        options = {{title: "Settings", tabBarLabel:"Settings", tabBarLabelStyle: {padding: 5}}}/>
      </Tab.Navigator>
  
      );
  }
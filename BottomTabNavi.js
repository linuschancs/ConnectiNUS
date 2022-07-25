import React, {useState, useEffect, useContext} from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
    Pressable,
    View
  } from 'react-native';
import { database, collection, getFirestore, doc,  getDoc } from "firebase/firestore";   
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatsPage from './ChatsPage';
import SearchPage from './SearchPage';
import SettingsPage from './SettingsPage';
//import FriendsPage from './FriendsPage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';


const Tab = createBottomTabNavigator();

export function BottomTabNavi({ navigation }) {
  
  let auth = getAuth();
  const db = getFirestore();
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();
  
  const getUser = async() => {
      const docRef = doc(collection(db, "users"), auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if( docSnap.exists() ) {
          console.log('User Data:', docSnap.data());
          setUserData(docSnap.data());
      } else {
          console.log('No such User Document')
      }
    }
    useEffect(() => {
        if(isFocused) {
          getUser();
        }
    }, [navigation, isFocused]);

  const onPressHandler = () => {
    navigation.navigate('MyProfilePage');
  }

  const getInitials = (string) => {
    const names = string.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

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
                top: '10%',
                padding: 5,
                right: '10%',
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
            {userData ? (userData.profilePic ? <Avatar.Image size={40} source={{uri: userData.profilePic}} style={{backgroundColor: userData.userColor}}/> : <Avatar.Text size={40} label={getInitials(userData.displayName)} style={{backgroundColor: userData.userColor}}/>): <View></View>}
            </Pressable> 
        ),
          headerTintColor: '#275B9F',
          headerTitleStyle: {
            fontWeight: 'bold',
            position: 'absolute',
            alignSelf: 'center',
            top: 10,
          },
          tabBarActiveTintColor: '#F4A836',
          tabBarInactiveTintColor: '#275B9F',
          tabBarStyle: {
            height: '10%',
            position: 'absolute',
            //bottom: '2%',
            justifyContent: 'center',
            //right: 15,
            //left: 15,
            //borderRadius: 15,
            backgroundColor:"#FFFF",
            alignItems: 'center'
          },
          tabBarLabelStyle: {
            marginBottom: '5%',
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if(route.name==='SearchPage') {
              iconName = 'search';
              size = focused ? 25 : 20;
            } else if (route.name==='ChatsPage2') {
              iconName = 'comments';
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
      >
        <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options = {{title: "Search", tabBarLabel:"Search", headerStyle:{height: '10%'}}}/>
        <Tab.Screen
        name='ChatsPage2'
        component={ChatsPage}
        options = {{title: "Chats", tabBarLabel:"Chats", headerStyle:{height: '10%'}}}/>
        <Tab.Screen
        name='SettingsPage'
        component={SettingsPage}
        options = {{title: "Settings", tabBarLabel:"Settings",  headerStyle:{height: '10%'}}}/>
      </Tab.Navigator>
  
      );
  }

  const styles = StyleSheet.create({
    userImg: {
      height: 46,
      width: 46,
      borderRadius: 23,
    },
  })
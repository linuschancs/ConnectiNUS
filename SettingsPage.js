import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { getAuth} from "firebase/auth";

export default function SettingsPage({ navigation }) {
    let auth = getAuth();
    const logout = () => {
        auth.signOut()
        .then(()=> {
            console.log('User successfully signed out');
            navigation.navigate('LoginPage');
        })
        .catch((error) => {
            alert(error.message);
            console.log(error);
        })
        
    };
    return (
        <SafeAreaView style={styles.body}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                logout();
                }}>
                <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.text1}> This is the Settings Page. This page has not been implemented.</Text>
          </ScrollView>
        </SafeAreaView>
      );
  }
  
  const styles = StyleSheet.create({
      body: {
        flex:1,
        backgroundColor: '#4B8BDF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
          flex: 1,
          backgroundColor: '#4B8BDF',
          padding: 20,
        },
        userBtnWrapper: {
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 10,
        },
        userBtn: {
            backgroundColor: '#fff',
          borderColor: '#2e64e5',
          borderWidth: 2,
          borderRadius: 3,
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginHorizontal: 5,
        },
        userBtnTxt: {
          color: '#2e64e5',
        },
        text1: {
            padding: 20,
            textAlign: 'center',
        }
  })
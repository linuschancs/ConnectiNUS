import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChatsPage({ navigation }) {

    const onPressHandler = () => {
        navigation.navigate('InnerChatsPage');
    }

    return (
        <View style={styles.body}>

            <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >
            <Text style={styles.text2}>
              Join Chatroom
            </Text>
          </Pressable>
                  
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text1: {
        textAlign: 'center',
    },

    text2: {
        width:100,
        textAlign: 'center',
    }
})
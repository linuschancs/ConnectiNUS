import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';

export default function ChatGroupDetails({ route, navigation }) {
    const {module} = route.params;
    
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Avatar.Text size={160} label={module.substring(0,2)} style={{backgroundColor: '#FFCBC1'}}/>
                <Text style={styles.userName}>{module}</Text>
                <Text style={styles.aboutUser}>{module}</Text>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => {
                    }}>
                    <Text style={styles.userBtnTxt}>Leave Chat</Text>
                </TouchableOpacity>
            </ScrollView>   
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      //backgroundColor: '#4B8BDF',
      //alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
      },
      userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
      },
      aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
      },
      userBtn: {
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
})
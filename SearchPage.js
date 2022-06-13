import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ModData from "./nusMods2021.json";

export default function SearchPage({ navigation }) {
        //const [dataSource] = useState(ModData);
        const [filtered, setFiltered] = useState([])
        const [searching, setSearching] = useState(false)

        const onSearch = (text) => {
          if (text === "") {
            setSearching(false)
            setFiltered([])
          }
          else {
            setSearching(true)
            const temp = text.toUpperCase()
            const tempList = ModData.filter(item => {
         return item.moduleCode.includes(temp)
            })
            setFiltered(tempList)
          }
      
        }
        return (
          <View style={styles.body}>
      
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              placeholderTextColor='white'
              onChangeText={onSearch}
      
            />

            <TouchableOpacity
            //onPress={props.onPress}
            style={styles.container2}>

            <View style={styles.subContainer}>
                {
                    filtered.length !== 0 ?

                        filtered.slice(0,5).map(item => {
                            return (
                                <View style={styles.itemView}>
                                    <Text style={styles.itemText}>{item.moduleCode}</Text>
                                </View>
                            )
                        }) 

                        : searching
                        ?
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No search items matched</Text>
                        </View>
                        : <View></View>
                }

            </View>
            </TouchableOpacity>

            
          
            </View>

        )
    };

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
      alignItems: 'center',
      //justifyContent: 'center',
      //marginTop: '20%',
    },

    textInput: {
        backgroundColor: '#BFBFBF',
        width: '80%',
        borderRadius: 5,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
      },
    container2: {
        position: 'absolute',
        top: '6.2%',
        left: 0, right: 0, bottom: 0,

    },
    subContainer: {

        backgroundColor: '#84DCC6',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        //marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
})
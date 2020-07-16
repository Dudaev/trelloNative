import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {FlatList, TouchableOpacity} from "react-native-web";
import AddListInput from './AddListInput/AddListInput';
import Cards from './Cards/Cards';

export default function MyDesc(props) {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('Cards', item.id )}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.title}>

                <AddListInput/>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={props.columns}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
    },
    title:{
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    body:{
        flex: 9,

    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    text: {
        flex: 1
    },
    add: {
    }
});

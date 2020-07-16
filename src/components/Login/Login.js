import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {TextInput, TouchableOpacity} from "react-native-web";

const Login = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => props.SetEmail(text)}
                value={props.authorReducer.email}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => props.SetName(text)}
                value={props.authorReducer.name}
            />
            <TextInput
                style={styles.input}
                onChangeText={text => props.SetPassword(text)}
                value={props.authorReducer.password}
            />
            <TouchableOpacity onPress={()=>props.signIn()}>
                <Text style={styles.text}>signIn</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
    },
    input: {
        borderWidth: 1,
    },
});

export default Login;
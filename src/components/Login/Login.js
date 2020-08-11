import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
  },
});

const Login = props => (
  <View style={styles.container}>
    <TextInput style={styles.input} onChangeText={text => props.setEmail(text)} value={props.authorReducer.email} />
    <TextInput style={styles.input} onChangeText={text => props.setName(text)} value={props.authorReducer.name} />
    <TextInput
      style={styles.input}
      onChangeText={text => props.setPassword(text)}
      value={props.authorReducer.password}
    />
    <TouchableOpacity onPress={() => props.signIn()}>
      <Text style={styles.text}>signIn</Text>
    </TouchableOpacity>
  </View>
);

Login.propTypes = {
  setEmail: PropTypes.func,
  authorReducer: PropTypes.object,
  setName: PropTypes.func,
  setPassword: PropTypes.func,
  signIn: PropTypes.func,
};

export default Login;

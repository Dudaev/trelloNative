import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signIn } from '../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    height: 50,
    // width: 250,
    borderColor: '#E5E5E5',
    // marginLeft: 14,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#BFB393',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
});

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = () => {
    props.signIn(email, password, () => props.navigation.navigate('MyDesk'));
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email..."
        placeholderTextColor="#9C9C9C"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password..."
        placeholderTextColor="#9C9C9C"
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
        <Text style={styles.text}>ОК</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
        <Text style={styles.text}>Зарегистрироватся</Text>
      </TouchableOpacity>
    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object,
  signIn: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, {
  signIn,
})(SignIn);

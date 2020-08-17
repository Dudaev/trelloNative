import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInThunk } from '../../redux/actions';

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

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = () => {
    props.signInThunk(email, password, () => props.navigation.navigate('MyDesk'));
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setEmail(text)} value={email} />
      <TextInput style={styles.input} onChangeText={text => setPassword(text)} value={password} />
      <TouchableOpacity onPress={() => signIn()}>
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
  signInThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, {
  signInThunk,
})(SignIn);

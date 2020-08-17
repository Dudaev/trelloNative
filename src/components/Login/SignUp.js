import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { getAuthUserData } from '../../redux/actions';

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

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const signUp = () => {
    props.getAuthUserData(email, name, password, () => props.navigation.navigate('MyDesk'));
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value) {
        props.navigation.navigate('SignIn');
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setEmail(text)} value={email} />
      <TextInput style={styles.input} onChangeText={text => setName(text)} value={name} />
      <TextInput style={styles.input} onChangeText={text => setPassword(text)} value={password} />
      <TouchableOpacity onPress={() => signUp()}>
        <Text style={styles.text}>ОК</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
        <Text style={styles.text}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

SignUp.propTypes = {
  state: PropTypes.object,
  navigation: PropTypes.object,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  setToken: PropTypes.func,
  setName: PropTypes.func,
  getAuthUserData: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, { getAuthUserData })(SignUp);

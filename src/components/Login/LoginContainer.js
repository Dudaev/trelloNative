import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {setColumnsThunk, setEmail, setName, setPassword, setToken} from '../../redux/actions';
import Login from './Login';

const LoginContainer = props => {
  const signIn = () => {
    axios
      .post(`http://trello-purrweb.herokuapp.com/auth/sign-up`, {
        email: props.state.authorReducer.email,
        name: props.state.authorReducer.name,
        password: props.state.authorReducer.password,
      })
      .then(response => {
        let token = `Bearer ${response.data.token}`
        props.setToken(token);
        props.navigation.navigate('MyDesc');
      });
  };
  return (
    <Login
      signIn={signIn}
      authorReducer={props.state.authorReducer}
      setEmail={email => props.setEmail(email)}
      setPassword={password => props.setPassword(password)}
      setName={name => props.setName(name)}
    />
  );
};

LoginContainer.propTypes = {
  state: PropTypes.object,
  navigation: PropTypes.object,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  setToken: PropTypes.func,
  setName: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, { setEmail, setPassword, setToken, setName, setColumnsThunk })(LoginContainer);

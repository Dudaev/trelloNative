import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthUserData, setEmail, setName, setPassword, setToken } from '../../redux/actions';
import Login from './Login';

const LoginContainer = props => {
  const signIn = () => {
    props.getAuthUserData(
      props.state.authorReducer.email,
      props.state.authorReducer.name,
      props.state.authorReducer.password,
      () => props.navigation.navigate('MyDesc'),
    );
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
  getAuthUserData: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, { setEmail, setPassword, setToken, setName, getAuthUserData })(LoginContainer);

import 'react-native-gesture-handler';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import thunkMiddleware from 'redux-thunk';
import { Button, Image, TouchableOpacity, Text } from 'react-native';
import rootReducer from './src/redux/rootReducer';
import Cards from './src/components/MyDesc/Cards/Cards';
import CardDetailWindow from './src/components/MyDesc/Cards/CardDetailWindow/CardDetailWindow';
import MyDesk from './src/components/MyDesc/MyDesk';
import SignIn from './src/components/Login/SignIn';
import SignUp from './src/components/Login/SignUp';
import Navigation from './src/components/Navigation';
import AddListInput from './src/components/MyDesc/AddListInput/AddListInput';

const Stack = createStackNavigator();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleware)));

function App(props) {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;

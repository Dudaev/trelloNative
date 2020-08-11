import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './src/redux/rootReducer';
import Cards from './src/components/MyDesc/Cards/Cards';
import CardDetailWindow from './src/components/MyDesc/Cards/CardDetailWindow/CardDetailWindow';
import MyDesc from './src/components/MyDesc/MyDesc';
import SignIn from "./src/components/Login/SignIn";
import SignUp from "./src/components/Login/SignUp";

const Stack = createStackNavigator();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleware)));

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MyDesc" component={MyDesc} />
          <Stack.Screen name="Cards" component={Cards} />
          <Stack.Screen name="CardDetailWindow" component={CardDetailWindow} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

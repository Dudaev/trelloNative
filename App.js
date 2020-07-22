import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import rootReducer from './src/redux/rootReducer';
import LoginContainer from './src/components/Login/LoginContainer';
import MyDescContainer from './src/components/MyDesc/MyDescContainer';
import Cards from './src/components/MyDesc/Cards/Cards';
import CardDetailWindow from './src/components/MyDesc/Cards/CardDetailWindow/CardDetailWindow';

const Stack = createStackNavigator();
const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginContainer} />
          <Stack.Screen name="MyDesc" component={MyDescContainer} />
          <Stack.Screen name="Cards" component={Cards} />
          <Stack.Screen name="CardDetailWindow" component={CardDetailWindow} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

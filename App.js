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
import MyDesk from './src/components/MyDesc/MyDesk';
import SignIn from './src/components/Login/SignIn';
import SignUp from './src/components/Login/SignUp';
import AddListInput from './src/components/MyDesc/AddListInput/AddListInput';

const Stack = createStackNavigator();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleware)));

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              height: 95,
            },
            headerTitleAlign: 'center',
            headerTintColor: '#514D47',
            headerTitleStyle: {
              fontSize: 17,
            },
          }}
        >
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="MyDesk"
            component={MyDesk}
            options={{
              // eslint-disable-next-line react/display-name
              headerRight: () => <AddListInput />,
              title: 'My Desk',

              headerRightContainerStyle: {
                paddingRight: 15,
              },
              headerLeft: false,
            }}
          />

          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen
            name="Cards"
            component={Cards}
            options={{
              headerLeft: false,
            }}
          />
          <Stack.Screen
            name="CardDetailWindow"
            component={CardDetailWindow}
            options={{
              headerStyle: {
                backgroundColor: '#BFB393',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

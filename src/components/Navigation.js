import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cards from './MyDesc/Cards/Cards';
import CardDetailWindow from './MyDesc/Cards/CardDetailWindow/CardDetailWindow';
import MyDesk from './MyDesc/MyDesk';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import AddListInput from './MyDesc/AddListInput/AddListInput';

const Stack = createStackNavigator();

function Navigation() {
  return (
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
          options={({ route }) => ({ title: route.params.listTitle, headerLeft: false })}
        />
        <Stack.Screen
          name="CardDetailWindow"
          component={CardDetailWindow}
          options={({ route }) => ({
            title: route.params.cardTitle,
            headerStyle: {
              backgroundColor: '#BFB393',
            },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

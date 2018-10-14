import React, { Component} from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import ChatScreen from './screens/ChatScreen';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Menu: MenuScreen,
        Login: LoginScreen,
        Register: RegisterScreen,
        Questionnaire: QuestionnaireScreen,
        Chat: ChatScreen 
    },
    {
        initialRouteName: 'Menu',
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}

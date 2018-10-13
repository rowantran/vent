import React, { Component} from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MenuScreen from './screens/MenuScreen';
import RegisterScreen from './screens/RegisterScreen';

const RootStack = createStackNavigator(
    {
        Menu: MenuScreen,
        Register: RegisterScreen,
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

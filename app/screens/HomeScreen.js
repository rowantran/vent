import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as config from '../config';

export default class HomeScreen extends Component {
    logOut = () => {
        try {
            AsyncStorage.removeItem('jwt');
        } catch (err) {
            Alert.alert('Error');
        }
    }

    render() {
        return (
            <View>
                <Button onPress={this.logOut} title='Log out' />
            </View>
        );
    }
}

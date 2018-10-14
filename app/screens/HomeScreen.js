import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as config from '../config';

class JWTKey extends Component {
    constructor(params) {
        super(params);
        this.state = {
            jwtString: ''
        }

        this.setState({ jwtString: AsyncStorage.getItem('jwt') });
    }

    render() {
        let jwt = AsyncStorage.getItem('jwt');
        return (
            <View>
                <Text>{this.state.jwtString}</Text>
            </View>
        );
    }
}

export default class HomeScreen extends Component {
    logOut = () => {
        AsyncStorage.removeItem('jwt', (err) => {
            if (!err) {
                Alert.alert('no error');
            } else {
                Alert.alert('Error removing');
            }
        });
    }

    render() {
        return (
            <View>
                <JWTKey />
                <Button onPress={() => {
                    this.props.navigation.navigate('Questionnaire');
                }} title='Go to questionnaire' />
                <Button onPress={this.logOut} title='Log out' />
            </View>
        );
    }
}

import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as config from '../config';

/*class JWTKey extends Component {
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
}*/

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: ''
        }

        this.loadUsername();
    }

    loadUsername = async () => {
        this.state.username = await AsyncStorage.getItem('username');
        this.setState({ username: this.state.username });
    }

    logOut = () => {
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('jwt', (err) => {
            if (!err) {
                //Alert.alert('no error');
            } else {
                Alert.alert('Error removing');
            }
        })
        .then(() => {
            this.props.navigation.navigate('Menu');
        });
    }

    joinAsVenter = () => {
        Alert.alert('Venter');
    }

    joinAsListener = () => {
        Alert.alert('Listener');
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 36 }}>Welcome, {this.state.username}</Text>
                <Button onPress={() => {
                    this.props.navigation.navigate('Questionnaire');
                }} title='Go to questionnaire' />
                <Button onPress={this.joinAsVenter} title='Vent' />
                <Button onPress={this.joinAsListener} title='Listen' />
                <Button onPress={this.logOut} title='Log out' />
            </View>
        );
    }
}

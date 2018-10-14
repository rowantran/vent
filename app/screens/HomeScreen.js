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
            username: '',
            jwt: ''
        }

        this.loadLogin();
    }

    loadLogin = async () => {
        this.setState({ username: await AsyncStorage.getItem('username'), jwt: await AsyncStorage.getItem('jwt')});
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
        fetch(config.SERVER_URL + '/match/join', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                jwt: this.state.jwt,
                venter: "0"
            })
        })
        .then(() => {
            this.props.navigation.navigate('Queued');
        });
    }

    joinAsListener = () => {
        fetch(config.SERVER_URL + '/match/join', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                jwt: this.state.jwt,
                venter: "1"
            })
        })
        .then(() => {
            this.props.navigation.navigate('Queued');
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    <Text style={{ fontSize: 36 }{fontFamily: "Avenir"}{color: #33ccff}}>Welcome, {this.state.username}</Text>
                    <Button onPress={() => {
                        this.props.navigation.navigate('Questionnaire');
                    }} title='Go to questionnaire' />
                    <Button onPress={this.joinAsVenter} title='Vent' />
                    <Button onPress={this.joinAsListener} title='Listen' />
                </View>
                <View>
                    <Button style={{position: 'absolute', bottom: -200, right: -170 }}onPress={this.logOut} title='Log out' />
                </View>
            </View>
        );
    }
}

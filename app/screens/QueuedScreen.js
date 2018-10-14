import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as config from '../config';
import openSocket from 'socket.io-client';

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


export default class QueuedScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            jwt: '',
            socket: ''
        }

        this.state.socket = openSocket(config.SERVER_URL);
        this.loadLogin();
    }

    loadLogin = async () => {
        this.setState({ username: await AsyncStorage.getItem('username'), jwt: await AsyncStorage.getItem('jwt')});
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 36 }}>Waiting...</Text>
            </View>
        );
    }
}

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

class LoadingText extends Component {
    render() {
        if (!this.state.ready) {
            return (
                <Text>Waiting...</Text>
            );
        } else {
            return '';
        }
    }
}

export default class QueuedScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            jwt: '',
            socket: '',
            ready: false,
        }

        this.state.socket = openSocket(config.SERVER_URL);
        this.loadLogin();

        this.state.socket.emit('enter', 'enter');
        this.state.socket.on('ready', (msg) => {
            this.setState( {ready: true});
        });
    }

    loadLogin = async () => {
        this.setState({ username: await AsyncStorage.getItem('username'), jwt: await AsyncStorage.getItem('jwt')});
    }

    render() {
        if (this.state.ready) {
            return (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 36 }}>matched!</Text>
                </View>
            ) 
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 36 }}>waiting...</Text>
                </View>
            );
        }
    }
}

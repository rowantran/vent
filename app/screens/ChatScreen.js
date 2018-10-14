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

export default class ChatScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            jwt: '',
            socket: '',
            ready: false,
            currentMessage: '',
            messages: [] 
        }

        this.state.socket = openSocket(config.SERVER_URL);
        this.loadLogin();

        this.state.socket.emit('enter', 'enter');
        this.state.socket.on('ready', (msg) => {
            this.setState( {ready: true});
        });

        this.state.socket.on('message', (msg) => {
            const currentMessages = this.state.messages;
            currentMessages.push(msg);
            this.setState({ messages: currentMessages });
        })
    }

    loadLogin = async () => {
        this.setState({ username: await AsyncStorage.getItem('username'), jwt: await AsyncStorage.getItem('jwt')});
    }

    setCurrentMessage = (text) => {
        this.setState({ currentMessage: text });
    }

    sendMessage = () => {
        //Alert.alert(this.state.currentMessage);
        this.state.socket.emit('message', this.state.currentMessage);
        this.setState({ currentMessage: '' });
    }

    componentWillUnmount = () => {
        this.state.socket.disconnect();
    }

    render() {
        if (this.state.ready) {
            var renderText = [];
            for (var i = 0; i < this.state.messages.length; i++) {
                renderText.push(
                    <Text key={i}>{this.state.messages[i]}</Text>
                );
            }

            return (
                <View>
                    {renderText}
                    <Input placeholder='talk...' onChangeText={this.setCurrentMessage} value={this.state.currentMessage} />
                    <Button onPress={this.sendMessage} title='Send' />
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 36 }}>waiting...</Text>
                </View>
            );
        }
    }
}

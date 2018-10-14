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

class ChatMessage extends Component {
    render() {
        if (this.props.username == this.props.myUsername) { 
            return (
                <Text style={styles.chatmessage}>{this.props.username}: {this.props.text}</Text>
            )        
        } else {
            return (
                <Text style={styles.chatmessageother}>{this.props.username}: {this.props.text}</Text>
            )
        }
    }
}

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
        this.loadLogin(() => this.connectSocket());
    }

    connectSocket = () => {
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

    loadLogin = async (cb) => {
        this.setState({ username: await AsyncStorage.getItem('username'), jwt: await AsyncStorage.getItem('jwt')});
        cb();
    }

    setCurrentMessage = (text) => {
        this.setState({ currentMessage: text });
    }

    sendMessage = () => {
        //Alert.alert(this.state.currentMessage);
        this.state.socket.emit('message', JSON.stringify({
            msg: this.state.currentMessage,
            username: this.state.username
        }));
        this.setState({ currentMessage: '' });
    }

    componentWillUnmount = () => {
        this.state.socket.disconnect();
    }

    render() {
        if (this.state.ready) {
            var renderText = [];
            for (var i = 0; i < this.state.messages.length; i++) {
                var msgObject = JSON.parse(this.state.messages[i]);
                renderText.push(
                    <ChatMessage key={i} text={msgObject.msg} username={msgObject.username} myUsername={this.state.username} />
                );
            }

            return (
                <View style={styles.root}>
                    {renderText}
                    <View style={styles.form}>
                        <Input placeholder='talk...' onChangeText={this.setCurrentMessage} value={this.state.currentMessage} />
                        <Button onPress={this.sendMessage} title='Send' />
                    </View>
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

const styles = StyleSheet.create({
    root: {
        paddingBottom: 50,
        width: '100%',
        height: '100%'
    },
    form: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    chatmessage: {
        padding: 5,
    },
    chatmessageother: {
        padding: 5,
        color: '#0097d8'
    }
});
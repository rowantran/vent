import React, { Component } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import * as config from '../config';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    // Called when username field changes, store the username in this.state 
    setUsername = (text) => {
        this.setState({ username: text });
    }

    setEmail = (text) => {
        this.setState({ email: text });
    }

    setPassword = (text) => {
        this.setState({ password: text });
    }

    sendRegistration = () => {
        //Alert.alert("User: " + this.state.username + ", email: " + 
        //    this.state.email + ", pass: " + this.state.password);
        //Alert.alert(config.SERVER_URL + '/user/create');
        fetch(config.SERVER_URL + '/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(() => {
                this.props.navigation.navigate('Login');
            });
    }

    render() {
        return (
            <ImageBackground source={{uri: 'https://hdwallsource.com/img/2014/9/gradient-26041-26726-hd-wallpapers.jpg'}} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Input
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={this.setUsername}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-open' }}
                        keyboardType='email-address'
                        onChangeText={this.setEmail}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        secureTextEntry={true} // Don't show typed text in field
                        onChangeText={this.setPassword}
                    />
                    <Input
                        placeholder='Confirm password'
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        secureTextEntry={true}
                    />
                    <Button onPress={this.sendRegistration} title='Register' style={styles.button} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        alignSelf: 'stretch'
    }
});

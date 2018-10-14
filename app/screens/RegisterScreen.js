import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

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

    render() {
        return (
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
                <Button onPress={() => {
                    Alert.alert("Registered." + this.state.username + " " +
                    this.state.password + " " + this.state.email);
                }}
                title="Register" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

import React, { Component } from 'react';
import { Alert, AsyncStorage, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as config from '../config';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    setUsername = (text) => {
        this.setState({ username: text });
    }

    setPassword = (text) => {
        this.setState({ password: text });
    }

    sendLogin = () => {
        //Alert.alert("User: " + this.state.username + ", password: " + this.state.password);
        //Alert.alert(config.SERVER_URL + '/user/login');
        //Alert.alert(JSON.stringify({username: this.state.username}));
        AsyncStorage.setItem('username', this.state.username);
        fetch(config.SERVER_URL + '/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => {
            //Alert.alert('Status ' + response.status);
            if (response.status == 200) {
                response.json().then((responseJson) => {
                    //Alert.alert('Got JWT: ' + responseJson.jwt);
                    try {
                        AsyncStorage.setItem('jwt', responseJson.jwt)
                            .then(() => {
                                this.props.navigation.navigate('Home');
                            });
                    } catch (err) {
                        Alert.alert('Error');
                    }
                });
            }
        })
        .catch((error) => {
            console.error(error);
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
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        secureTextEntry={true}
                        onChangeText={this.setPassword}
                    />
                    <Button onPress={this.sendLogin} title='Log in' style={styles.button} />	
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
        width: '100%'
    }
});

import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
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
            Alert.alert('Status ' + response.status);
            if (response.status == 200) {
                response.json().then((responseJson) => {
                    Alert.alert('Got JWT: ' + responseJson.jwt);
                    try {
                        AsyncStorage.setItem('jwt', responseJson.jwt);
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
                <Button onPress={this.sendLogin} title='Log in' />	
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

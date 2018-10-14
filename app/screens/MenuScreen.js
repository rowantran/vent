import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Header extends Component {
    render() {
        return (
            <Text style={styles.header}>Welcome to {this.props.name}</Text>
        );
    }
}

export default class MenuScreen extends React.Component {
    constructor(props) {
        super(props);
        try {
            const value = AsyncStorage.getItem('jwt');
            if (value != null) {
                this.props.navigation.navigate('Home');
            }
        } catch (err) {
            Alert.alert(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header name="Vent" />
                <Button onPress={() => {
                    this.props.navigation.navigate('Login');
                }}
                title="Log in" />

                <Button onPress={() => {
                    this.props.navigation.navigate('Register');
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
    },
    header: {
        fontSize: 36
    }
});

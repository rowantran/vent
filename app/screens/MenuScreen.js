import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

class Header extends Component {
    render() {
        return (
            <Text style={styles.header}>
            Welcome to {this.props.name}
            </Text>
        );
    }
}

export default class MenuScreen extends React.Component {
    checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('jwt');
            if (value != null) {
                this.props.navigation.navigate('Home');
            }
        } catch (err) {
            Alert.alert(err);
        }
    }

    constructor(props) {
        super(props);
        this.checkLoggedIn();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header name="Vent" />
                <Button onPress={() => {
                    this.props.navigation.navigate('Login');
                    this.componentWillUnmount();
                }}
                title="Log in" margin={10} />

                <Button onPress={() => {
                    this.props.navigation.navigate('Register');
                    this.componentWillUnmount();
                }}
                title="Register" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#051e47',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 42,
        color: "white",
        fontStyle: "italic",
        fontFamily: "Avenir",
    }
});

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <View>
                <Button onPress={() => {
                    Alert.alert("Registered.");
                }}
                title="Register" />
            </View>
        );
    }
}

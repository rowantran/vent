import React, { Component } from 'react';
import { Alert, Slider, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import * as config from '../config';

export default class QuestionnaireScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q1: 3,
            q2: 3
        };
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
        });
    }

    setQ1 = (val) => {
        this.setState({ q1: val });
    }

    setQ2 = (val) => {
        this.setState({ q2: val });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Question 1</Text>
                <Slider onSlidingComplete={this.setQ1} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Question 2</Text>
                <Slider onSlidingComplete={this.setQ2} style={{width: 300}} minimumValue={1} maximumValue={5} value={1} step={2} />

                <Button onPress={this.sendRegistration} title='Submit' />
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

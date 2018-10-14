import React, { Component } from 'react';
import { Alert, Button, Slider, StyleSheet, Text, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import * as config from '../config';

export default class QuestionnaireScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q1: 3,
            q2: 3,
            q3: 3,
            q4: 3,
            q5: 3,
            q6: 3,
            q7: 3,
            q8: 3,
            q9: 3,
            q10: 3
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

    setQ3 = (val) => {
        this.setState({ q3: val });
    }

    setQ4 = (val) => {
        this.setState({ q4: val });
    }

    setQ5 = (val) => {
        this.setState({ q5: val });
    }

    setQ6 = (val) => {
        this.setState({ q6: val });
    }

    setQ7 = (val) => {
        this.setState({ q7: val });
    }

    setQ8 = (val) => {
        this.setState({ q8: val });
    }

    setQ9 = (val) => {
        this.setState({ q9: val });
    }

    setQ10 = (val) => {
        this.setState({ q10: val });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>A rumour is being spread about you by someone, are you likely to confront that person? </Text>
                <Slider onSlidingComplete={this.setQ1} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>A person has challenged you to a fight, are you likely to confront that person? </Text>
                <Slider onSlidingComplete={this.setQ2} style={{width: 300}} minimumValue={1} maximumValue={5} value={1} step={2} />

                <Text>Someone is beating another person up, are you likely to confront that person? </Text>
                <Slider onSlidingComplete={this.setQ3} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Are you insecure? </Text>
                <Slider onSlidingComplete={this.setQ4} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Do you prefer camping, or staying at home (no for camping, yes for staying)</Text>
                <Slider onSlidingComplete={this.setQ5} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Are you religious? </Text>
                <Slider onSlidingComplete={this.setQ6} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Are you a moral person? </Text>
                <Slider onSlidingComplete={this.setQ7} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Are you good in group settings?</Text>
                <Slider onSlidingComplete={this.setQ8} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>Are you a social person? </Text>
                <Slider onSlidingComplete={this.setQ9} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Text>How comfortable are you speaking to strangers?</Text>
                <Slider onSlidingComplete={this.setQ10} style={{width: 300}} minimumValue={1} maximumValue={5} value={3} step={1} />

                <Button onPress={this.sendRegistration} title='Submit'/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 20
    }
});

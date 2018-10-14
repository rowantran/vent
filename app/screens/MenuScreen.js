import React, { Component } from 'react';
import { Alert, AsyncStorage, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

class Header extends Component {
    render() {
        return (
            <Text style={styles.header}>
            {this.props.name}
            </Text>
        );
    }
}

export default class MenuScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

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
            <ImageBackground source={{uri: 'https://hdwallsource.com/img/2014/9/gradient-26041-26726-hd-wallpapers.jpg'}} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Header name="Vent" />
                    <Button onPress={() => {
                        this.props.navigation.navigate('Login');
                        this.componentWillUnmount();
                    }}
                    title="Log in" style={styles.button} /> 

                    <Button onPress={() => {
                        this.props.navigation.navigate('Register');
                        this.componentWillUnmount();
                    }}
                    title="Register" style={styles.button} /> 
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 20,
        paddingTop: 130
    },
    header: {
        fontSize: 96,
        color: "white",
        fontWeight: "bold",
        fontFamily: "Avenir",
        textAlign: 'center'
    },
    button: {
        width: 200,
        backgroundColor: '#0097d8'
    }
});

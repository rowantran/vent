import React, { Component} from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

class Header extends Component {
    render() {
        return (
            <Text style={styles.header}>Welcome to {this.props.name}</Text>
        );
    }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Header name="Vent" />
          <Button onPress={() => {
              Alert.alert("Pressed log in!");
          }}
          title="Log in" />

          <Button onPress={() => {
              Alert.alert("Pressed register!");
          }}
          title="Register" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffg',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36
  }
});

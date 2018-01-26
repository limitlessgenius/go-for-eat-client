import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

class Login extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Login Helooooo</Text>
      </View>
    )
  }
}

export default Login;

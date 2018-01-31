import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

class LoadingPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Page Loading!</Text>
      </View>
    );
  }
}

export default LoadingPage;

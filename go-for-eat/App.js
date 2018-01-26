import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './config/store';
import Navigator from './config/routes';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator onNavigationStateChange={null} />
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

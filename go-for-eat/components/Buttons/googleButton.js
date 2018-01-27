import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';

class GoogleButton extends Component {
  render() {
    return (
      <View>
        <Button
          icon={{
            name:'google',
            type:'font-awesome'
          }}
          title='Login with Google'
          buttonStyle={styles.login_button__google}
        />
      </View>
    );
  }
}

export default GoogleButton;

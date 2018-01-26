import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = {
  button: {
    justifyContent: 'center',
    backgroundColor:'#4267b2',
    marginLeft:0,
  }
}

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
          buttonStyle={styles.button}
        />
      </View>
    )
  }
}

export default GoogleButton;

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

class FacebookButton extends Component {
  render() {
    return (
      <View>
        <Button
          icon={{
            name:'facebook',
            type:'font-awesome'
          }}
          title='Login with Facebook'
          buttonStyle={styles.button}
        />
      </View>
    )
  }
}

export default FacebookButton;

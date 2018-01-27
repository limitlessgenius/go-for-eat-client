import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';

class FacebookButton extends Component {

  loginFacebook = async () => {
    console.log('loginFacebook');
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('442248476177832', {
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      console.log("success");
      return fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,picture,email`)
      .then(res => res.json())
      .then(data => {
        data.accessToken = token;
        data.network = 'facebook';
        this.props.serverAuth(data);
      })
      .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <View>
        <Button
          icon={{
            name:'facebook',
            type:'font-awesome'
          }}
          title='Login with Facebook'
          buttonStyle={styles.login_button__fb}
          onPress={this.loginFacebook}
        />
      </View>
    );
  }
}

export default FacebookButton;

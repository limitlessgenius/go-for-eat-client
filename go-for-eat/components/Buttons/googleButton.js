import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import styles from './styles';

class GoogleButton extends Component {

  loginGoogle = async () => {
    console.log('loginGoogle');
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: '795597563248-aph6ms1e1f53i6ela2281hpcu09itjer.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        let data = {
          id: result.user.id,
          accessToken: result.accessToken,
          idToken: result.idToken,
          network: 'google'
        };
        this.props.serverAuth(data);
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }


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
          onPress={this.loginGoogle}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  });

const mapDispatchToProps = (dispatch) => ({
  serverAuth: (data) => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleButton);

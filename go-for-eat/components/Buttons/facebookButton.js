import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class FacebookButton extends Component {

  loginFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('442248476177832', {
      permissions: ['public_profile', 'email', 'user_birthday'],
    });
    if (type === 'success') {
      return fetch(`https://graph.facebook.com/me?access_token=${token}`)
      .then(res => res.json())
      .then(data => {
        data.accessToken = token;
        data.network = 'facebook';
        const allowed = ['id', 'accessToken', 'network'];
        const filtered = Object.keys(data)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});
        this.props.serverAuth(filtered);
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

const mapStateToProps = (state) => ({
  });

const mapDispatchToProps = (dispatch) => ({
  serverAuth: (data) => dispatch(loginUser(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(FacebookButton);

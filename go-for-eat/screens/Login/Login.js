import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { FacebookButton, GoogleButton } from '../../components/Buttons';
import serverHost from '../../config/serverHost.js';
import logo from '../../assets/logo/logo2x.png';
import styles from './styles';
import PropTypes from 'prop-types';
import { setUser } from '../../actions';
// import EStyleSheet from 'react-native-extended-stylesheet';

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  componentDidMount() {
    Expo.SecureStore.getItemAsync('state')
      .then(userData => {
        if (userData) {
          let user = JSON.parse(userData).authentication;
          if (user) {
            this.props.setUser(user)
            this.props.navigation.navigate('Home');
          }
        }
      });
  }
  render() {
    return (
      <View style={styles.login_container}>
        <View style={styles.login_logo}><Image source={logo}/></View>
        <Text style={styles.login_tagline}>
        Share your lunch with someone new,{'\n'} meet new people and create new contacts
        </Text>
        <FacebookButton/>
        <GoogleButton/>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

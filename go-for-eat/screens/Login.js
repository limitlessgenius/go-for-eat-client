import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { FacebookButton, GoogleButton } from '../components/Buttons';
import serverHost from '../config/serverHost.js'

// import EStyleSheet from 'react-native-extended-stylesheet';

const styles = {
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2ECC71',
  }
};

class Login extends Component {

  constructor(props) {
    super(props);
  }

  serverAuth = async (data) => {
    const allowed = ['id', 'accessToken', 'network'];
    const filtered = Object.keys(data)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    return fetch(`${serverHost}/auth`, {
      method: 'POST',
      mode: 'CORS',
      body: JSON.stringify(filtered),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(user => {
      console.log('serverAuth response', user);
      this.props.setUser(user);
      return Expo.SecureStore.setItemAsync('userData', JSON.stringify({user}));
    })
    .then(() => console.log("here!"))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'white', textAlign:'center', fontWeight:'bold', margin:'20'}}>Share your lunch with someone new,{"\n"} meet new people and create new contacts</Text>
        <FacebookButton serverAuth={this.serverAuth}/>
        <GoogleButton serverAuth={this.serverAuth}/>
      </View>
    );
  }
}

export default Login;

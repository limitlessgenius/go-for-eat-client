import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
class Profile extends Component {

  componentDidMount() {
    console.log('check user data', this.props.user);
    Expo.SecureStore.getItemAsync('state')
      .then(userData => {
        if (userData) {
          console.log("userData", userData);
        }
      })
  }

  render() {
    return <Text>Hello from profile</Text>
  }
}

const mapStateToProps = (state) => ({
  user:state.authentication
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

class User extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  render() {
    return <Text>Hello from user</Text>
  }
}

export default User;

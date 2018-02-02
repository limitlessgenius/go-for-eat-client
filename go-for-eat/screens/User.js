import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

class User extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  render() {
    console.log(this.props.users)
    return <Text>Hello { this.props.users[this.props.user].name }</Text>
  }
}
const mapStateToProps = (state) => ({
  users: state.entities.users,
  user: state.pages.User.userId
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

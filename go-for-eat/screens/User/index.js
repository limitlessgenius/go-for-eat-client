import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserBio } from '../../components/UserBio';
import { getUser } from '../../actions';

class User extends Component {

  constructor (props) {
    super(props);
    this.props.getUserInfo(this.props.userId);
  }

  render() {
    return <UserBio user={this.props.user}/>;
  }
}
const mapStateToProps = (state) => ({
  userId: state.pages.User.userId,
  user: state.pages.User.userData
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (userId) => dispatch(getUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

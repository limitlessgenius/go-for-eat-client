import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserBio } from '../../components/UserBio';

class Profile extends Component {

  render() {
    return (this.props.user?<UserBio user={this.props.user}/>:null);
  }
}

const mapStateToProps = (state) => ({
  user:state.authentication.user
});


export default connect(mapStateToProps, null)(Profile);

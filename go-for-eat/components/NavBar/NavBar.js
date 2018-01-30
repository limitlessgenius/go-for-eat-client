import React, { Component } from 'react';
import { View, Text, Image, Avatar, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

import { connect } from 'react-redux';

import logout from '../../actions';

import navNew from '../../assets/icons/nav_new.png';
import navBack from '../../assets/icons/nav_back.png';
import navProfile from '../../assets/icons/nav_profile.png';
import navLogout from '../../assets/icons/nav_logout.png';
import logo from '../../assets/logo/logo2x.png';
import style from './styles.js';
import PropTypes from 'prop-types';

class NavBar extends Component {

  handleLogout = () => {
    this.props.logout();
    this.props.navigation.navigate('Login')
  }

  renderMyProfileButton = () => {

  }

  renderNavBackButton = () => {

  }

  renderCreateButton = () => {

  }

  renderLogoutButton = () => {
    return (
      <TouchableOpacity
      onPress={this.handleLogout}
      >
        <Image style={style.navbar_icon} source={navLogout}/>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <Header
        leftComponent={<Image style={style.navbar_icon} source={navNew}/>}
        centerComponent={<Image style={style.navbar_logo} source={logo}/>}
        rightComponent={<Image style={style.navbar_icon} source={navProfile}/>}
        outerContainerStyles={style.navbar_container}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading:state.authentication.loading,
});

const mapDispatchToProps = dispatch => ({
  // logout:dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

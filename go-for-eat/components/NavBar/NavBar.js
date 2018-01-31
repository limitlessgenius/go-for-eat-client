import React, { Component } from 'react';
import { View, Text, Image, Avatar, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { logoutUser, navigate, navigateBack } from '../../actions';
import { logoutStorage } from '../../localStorage'

import navNew from '../../assets/icons/nav_new.png';
import navBack from '../../assets/icons/nav_back.png';
import navProfile from '../../assets/icons/nav_profile.png';
import navLogout from '../../assets/icons/nav_logout.png';
import navClose from '../../assets/icons/nav_close.png';
import logo from '../../assets/logo/logo2x.png';
import style from './styles.js';
import PropTypes from 'prop-types';

class NavBar extends Component {

  handleNavBack = () => {
    this.props.navigateBack();
  }

  handleMyProfile = () => {
    this.props.navigate('Profile');
  }

  handleCreate = () => {
    this.props.navigate('CreateEvent');
  }

  handleLogout = () => {
    const serializedState = JSON.stringify({});
    Expo.SecureStore.setItemAsync('state', serializedState);
    this.props.logoutState();
    this.props.navigate('Login');
  }

  renderMyProfileButton = () => {
    return (
      <TouchableOpacity
        onPress={this.handleMyProfile}>
        <Image style={style.navbar_icon} source={navProfile}/>
      </TouchableOpacity>
    )
  }

  renderNavBackButton = () => {
    return (
      <TouchableOpacity
      onPress={this.handleNavBack}
      >
        <Image
          style={style.navbar_icon}
          source={navBack}
        />
      </TouchableOpacity>
    )
  }

  renderCreateButton = () => {
    return (
      <TouchableOpacity
        onPress={this.handleCreate}
      >
        <Image
          style={style.navbar_icon}
          source={navNew}

        />
      </TouchableOpacity>
    )
  }

  renderCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={this.handleNavBack}
      >
        <Image
          style={style.navbar_icon}
          source={navClose}

        />
      </TouchableOpacity>
    )
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

    const buttonMap = {
      'Home': {
        left:this.renderCreateButton(),
        right:this.renderMyProfileButton()
      },
      'Profile': {
        left:this.renderCloseButton(),
        right: this.renderLogoutButton(),
      },
      'User': {
        left:this.renderNavBackButton(),
        right:null
      },
      'CreateEvent': {
        left:this.renderCloseButton(),
        right:null
      },
      'Login': {
        left:null,
        right:null
      }
    }

    return (
      <View>
      <Header
        leftComponent={buttonMap[this.props.screen].left}
        centerComponent={this.props.screen==='Home'?<Image source={logo} style={style.navbar_logo}/>:<View><Text style={style.navbar_title}>{this.props.screen}</Text></View>}
        rightComponent={buttonMap[this.props.screen].right}
        outerContainerStyles={style.navbar_container}
      />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav:state.nav,
  screen:state.pages.currentScreen,
  user:state.authentication
});

const mapDispatchToProps = dispatch => ({
  logoutState:() => dispatch(logoutUser()),
  navigate: (screen) => dispatch(navigate(screen)),
  navigateBack: () => dispatch(navigateBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

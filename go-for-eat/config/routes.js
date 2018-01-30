import React from 'react';

import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import { NavBar } from '../components/NavBar';
import { Profile } from '../screens/Profile';
import { User } from '../screens/User';
import { CreateEvent } from '../screens/CreateEvent';

const NavigatorWithRootScreen = (name) => {
  return StackNavigator({
    [name] : {
      screen:name,
      navigationOptions:{
        gesturesEnabled:false,
        header:(<NavBar/>),
      }
    }
  });
};

const NavigatorWithModal = (name) => {
  return StackNavigator({
    [name] : {
      screen:name,
      navigationOptions:{
        gesturesEnabled:false,
      }
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  });
};

const HomeStack = StackNavigator({
  Home: {
    screen: NavigatorWithRootScreen(Home),
    navigationOptions:{header:()=>null}
  },

  // User: {
  //   screen: NavigatorWithRootScreen(User),
  //   navigationOptions:{header:()=>null}
  // },
  // CreateEvent: {
  //   screen: NavigatorWithModal(NavigatorWithRootScreen(CreateEvent)),
  //   navigationOptions:{header:()=>null}
  // }
});

export default StackNavigator(
  {
    Login: {
      screen: Login
    },
    Loading: {
      screen: HomeStack,
      navigationOptions: {
        gesturesEnabled: false,
      }
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

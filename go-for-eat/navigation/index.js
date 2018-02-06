import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { NavBar } from '../components/NavBar';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import User from '../screens/User';
import Profile from '../screens/Profile/Profile';
import { CreateEvent } from '../screens/CreateEvent';
import { EditEvent } from '../screens/EditEvent';
import LoadingPage from '../screens/LoadingPage';

const NavigatorWithRootScreen = (routeName, screen) => {
  return StackNavigator({
    [routeName] : {
      screen,
      navigationOptions:{
        gesturesEnabled:false,
        header:(<NavBar/>),
      }
    }
  });
};


const HomeStack = StackNavigator({
  LoadingPage:{
    screen: LoadingPage
  },
  User: {
    screen: NavigatorWithRootScreen('User', User),
    navigationOptions:{header:()=>null}
  },
  Home: {
    screen: NavigatorWithRootScreen('Home', Home),
    navigationOptions:{header:()=>null}
  },
});

export const AppNavigator = StackNavigator({
  Login: {
    screen: Login
  },
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  CreateEvent: {
    screen:NavigatorWithRootScreen('CreateEvent', CreateEvent),
    navigationOptions:{header:()=>null}
  },
  EditEvent: {
    screen:NavigatorWithRootScreen('EditEvent', EditEvent),
    navigationOptions:{header:()=>null}
  },
  Loading:{
    screen:LoadingPage
  },
  Profile: {
    screen: NavigatorWithRootScreen('Profile', Profile),
    navigationOptions:{header:()=>null}
  },

},
{
  mode: 'modal',
  headerMode: 'none'
}
);

class AppWithNavigationState extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation = {addNavigationHelpers({
          dispatch,
          state:nav,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav:state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);

import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
    }
  },
});

export default StackNavigator(
  {
    Login: {
      screen: Login
    },
    Loading: {
      screen: HomeStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home/Home';
// import Login from '../screens/Login';

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
    Home: {
      screen: Home
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

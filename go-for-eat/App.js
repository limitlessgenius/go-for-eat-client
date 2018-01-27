import React from 'react';
import { Provider } from 'react-redux';
import store from './config/store';
import Navigator from './config/routes';

export default class App extends React.Component {
  constructor() {
   super();
   this.state = {
    isReady: false
   };
  }

  componentWillMount() {
   this.loadFonts();
  }

  async loadFonts() {
   await Expo.Font.loadAsync({
    Roboto_Light: require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    Roboto_Thin: require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
    Roboto: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    Roboto_Medium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    Roboto_Bold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    Roboto_Black: require('./assets/fonts/Roboto/Roboto-Black.ttf'),
   });
   this.setState({ isReady: true });
  }

  render() {
   if (!this.state.isReady) {
    return <Expo.AppLoading />;
   }
   return (
    <Provider store={store}>
     <Navigator onNavigationStateChange={null} />
    </Provider>
   );
  }
}

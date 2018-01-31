import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import s from './styles';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class GooglePlacesInput extends Component {

  render() {
    return  (
      <View>
      </View>
    );
  }
}

export default GooglePlacesInput;
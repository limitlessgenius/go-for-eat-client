import React, { Component } from 'react';
import { Platform, View, Text, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GooglePlacesInput } from '../../components/GooglePlacesInput';

import s from './styles';

class CreateEvent extends Component {
  state = {
    location: null,
    errorMessage: null,
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  handleGo = () => {

  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return  (
      <View style={s.container}>
        <Text style={s.title}>Restaurant:</Text>
        <GooglePlacesAutocomplete
          placeholder='Search...'
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyAcLjRWKGZ5-pzYoV-bDHikVBkhCh2pcD0',
            language: 'en',
            types: '(restaurant)'
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch'
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          debounce={200}
          style={s.googlePlacesAutocomplete}
        />
        <Text style={s.title}>Date:</Text>
        <Text style={s.title}>Hours:</Text>

        <Button style={s.goButton} title="Go for it" onPress={this.handleGo}/>
        <Text style={s.warningText}>Warning text{text}</Text>
      </View>
    );
  }
}

export default CreateEvent;

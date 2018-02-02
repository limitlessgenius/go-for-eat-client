import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, View, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { Constants, Location, Permissions } from 'expo';
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from '../../components/GooglePlacesAutocomplete';
import { createEvent } from '../../actions';

const moment = require('moment');

import s from './styles';
import cs from './customStyles';

class CreateEvent extends Component {
  constructor (props) {
    super(props);
    this.newEvent = {};
  }

  state = {
    location: null,
    errorMessage: null,
    date: '',
    time: '',
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
    // console.log('GET LOCATION ASYNC');

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    // console.log('this.setState', location);
  };

  handleGo = () => {
    console.log('-----------------------handleGo---------------------');
    if ( this.newEvent.place_id && this.state.date !== '' && this.state.time !== '') {
      var date = this.state.date.split(" / ");
      var dateTime = date[2]+"-"+date[1]+"-"+date[0]+'T'+this.state.time.replace(/\s/g, '')+':00';
      this.newEvent.when = (new Date(dateTime).getTime())/1000
      console.log('newEvent', this.newEvent);
      this.props.createEvent(this.newEvent);
    } else {
      console.log('Please fill all the information');
    }
  }

  handleSelectPlace = (data, details) => {
    console.log('-----------------------handleSelectPlace---------------------');
    this.newEvent = {
      "place_id": details.id,
      "place_name": details.name,
      "place_address": details.formatted_address,
      "location": {
          "type": "Point",
          "coordinates": [details.geometry.location.lat, details.geometry.location.lng]
      }
    };
    console.log(this.newEvent);
  }

  render() {
    let text = 'Waiting..';
    let location = '';
    if (this.state.location) {
      location = this.state.location.coords.latitude +','+ this.state.location.coords.longitude;
    }
    return  (
      <View style={s.container}>
        <Text style={s.title}>Restaurant:</Text>
        <View style={s.GooglePlacesAutocompleteContainer}>
          <GooglePlacesAutocomplete />
        </View>
        <Text style={s.title}>Date:</Text>
        <DatePicker
          style={s.datePicker}
          date={this.state.date}
          mode="date"
          placeholder={''}
          format="DD / MM / YYYY"
          minDate={moment().format('DD / MM / YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={cs.datePicker}
          onDateChange={(date) => {this.setState({date: date}), console.log(this.state)}}
        />
        <Text style={s.title}>Hours:</Text>
        <DatePicker
          style={s.timePicker}
          date={this.state.time}
          mode="time"
          placeholder={''}
          format='HH : mm'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={cs.timePicker}
          onDateChange={(time) => {this.setState({time: time}), console.log(this.state)}}
        />
        <Text style={s.warningText}>Warning text</Text>
        <View style={s.bottomContainer}>
          <Button
            buttonStyle={s.goButton}
            textStyle={s.goButtonText}
            title="GO FOR IT"
            onPress={this.handleGo}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  createEvent: (data) => dispatch(createEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
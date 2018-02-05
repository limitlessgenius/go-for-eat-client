import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, View, Text, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from '../../components/GooglePlacesAutocomplete';
import { createEvent, navigate, closeCreateEventConfirmationAlert, closeCreateEventErrorAlert } from '../../actions';

const moment = require('moment');

import s from './styles';
import cs from './customStyles';

class CreateEvent extends Component {
  constructor (props) {
    super(props);
    this.newEvent = {};
    this.state = {
      date: moment().format('DD / MM / YYYY'),
      time: moment().format('HH : mm'),
      okButtonDisabled: true,
      showActivityIndicator: false,
    };
  }

  confirmationAlert = () => {
    Alert.alert(
      'Your event has been created!',
      '',
      [
        {text: 'OK', onPress: () => this.onConfirmationAlertOk()},
      ],
      { cancelable: false }
    );
  }

  errorAlert = () =>{
    Alert.alert(
      'Oops',
      'Something went wrong, try to creat it again',
      [
        {text: 'OK', onPress: () => this.onErrorAlertOk()},
      ],
      { cancelable: false }
    );
  }

  onConfirmationAlertOk = () => {
    this.props.closeConfirmationAlertOpen();
    this.props.navigate('Home');
  }

  onErrorAlertOk = () => {
    this.props.closeErrorAlertOpen();
  }

  handleGo = () => {
    if ( this.newEvent.place_id && this.state.date !== '' && this.state.time !== '') {
      var date = this.state.date.split(' / ');
      var dateTime = date[2]+'-'+date[1]+'-'+date[0]+'T'+this.state.time.replace(/\s/g, '')+':00';
      this.newEvent.when = (new Date(dateTime).getTime())/1000;
      this.props.createEvent(this.newEvent);
      this.setState({okButtonDisabled: true});
      this.setState({showActivityIndicator: true});
    }
  }

  handleSelectPlace = (data, details) => {
    this.newEvent = {
      'place_id': data.id,
      'place_name': data.name,
      'place_address': data.vicinity,
      'place_url': details.url,
      'location': {
        'type': 'Point',
        'coordinates': [data.geometry.location.lng, data.geometry.location.lat]
      }
    };
    console.log('newEvent', this.newEvent);
    this.setState({okButtonDisabled: false});
  }

  renderBotom() {
    if (this.showActivityIndicator) {
      return (
        <ActivityIndicator size="large" color="#2ECC71" />
      );
    } else {
      return (
        <Button
          buttonStyle={s.goButton}
          textStyle={s.goButtonText}
          title='GO FOR IT'
          onPress={this.handleGo}
          disabled={this.state.okButtonDisabled}
          disabledStyle={s.disabledStyle}
          disabledTextStyle={s.isabledTextStyle}
        />
      );
    }
  }

  render() {
    if (this.props.confirmationAlertOpen) this.confirmationAlert();
    return  (
      <View style={s.container}>
        <Text style={s.title}>Restaurant:</Text>
        <View style={s.GooglePlacesAutocompleteContainer}>
          <GooglePlacesAutocomplete
            onPress={(data, details) => {
              this.handleSelectPlace(data, details);
            }}
          />
        </View>
        <Text style={s.title}>Date:</Text>
        <DatePicker
          style={s.datePicker}
          date={this.state.date}
          mode="date"
          format='DD / MM / YYYY'
          minDate={moment().format('DD / MM / YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={cs.datePicker}
          onDateChange={(date) => this.setState({date: date})}
        />
        <Text style={s.title}>Hours:</Text>
        <DatePicker
          style={s.timePicker}
          date={this.state.time}
          mode='time'
          format='HH : mm'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={cs.timePicker}
          onDateChange={(time) => this.setState({time: time})}
        />
        <View style={s.bottomContainer}>
          {this.renderBotom()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  confirmationAlertOpen: state.pages.CreateEvent.confirmationAlertOpen,
  errorAlertOpen: state.pages.CreateEvent.errorAlertOpen,
});

const mapDispatchToProps = (dispatch) => ({
  createEvent: (data) => dispatch(createEvent(data)),
  navigate: (screen) => dispatch(navigate(screen)),
  closeConfirmationAlertOpen: () => dispatch(closeCreateEventConfirmationAlert()),
  closeErrorAlertOpen: () => dispatch(closeCreateEventErrorAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);


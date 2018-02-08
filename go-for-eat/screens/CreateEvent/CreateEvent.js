import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, View, Text, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from '../../components/GooglePlacesAutocomplete';
import {
  createEvent,
  navigate,
  navigateBack,
  closeCreateEventConfirmationAlert,
  closeCreateEventErrorAlert,
} from '../../actions';
import debounce from 'lodash.debounce';

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

  componentWillMount() {
    this.handleGo = debounce(this.handleGo, 100);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.confirmationAlertOpen && !this.props.confirmationAlertOpen) this.confirmationAlert();
    else if(nextProps.errorAlertOpen && !this.props.errorAlertOpen) this.errorAlert();
  }

  confirmationAlert = () => {
    Alert.alert(
      'Congratulations!',
      'Your event has been created',
      [
        {text: 'OK', onPress: () => this.onConfirmationAlertOk()},
      ],
      { cancelable: false }
    );
    this.setState({showActivityIndicator: false});
  }

  errorAlert = () =>{
    Alert.alert(
      'Oops',
      'Something went wrong, try to create it again',
      [
        {text: 'OK', onPress: () => this.onErrorAlertOk()},
      ],
      { cancelable: false }
    );
    this.setState({
      showActivityIndicator: false,
      okButtonDisabled: false,
    });
  }

  onConfirmationAlertOk = () => {
    this.props.closeConfirmationAlertOpen();
    this.props.navigateBack();
  }

  onErrorAlertOk = () => {
    this.props.closeErrorAlertOpen();
  }

  handleGo = () => {
    if ( this.newEvent.place_id && this.state.date !== '' && this.state.time !== '') {
      let date = this.state.date.split(' / ');
      let time = this.state.time.split(':');
      let dateTime = new Date(date[2], parseInt(date[1], 10) - 1, date[0], time[0], time[1]);
      this.newEvent.when = dateTime.getTime();
      this.props.createEvent(this.newEvent);
      this.setState({
        okButtonDisabled: true,
        showActivityIndicator: true
      });
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
    this.setState({okButtonDisabled: false});
  }

  renderBotom() {
    if (this.state.showActivityIndicator && !this.props.confirmationAlertOpen) {
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
    return  (
      <View style={s.container}>
        <View style={s.warn_container}>
          <Text style={s.warn}>Have you checked for existing events at your chosen restaurant?</Text>
        </View>
        <Text style={s.title}>Restaurant:</Text>
        <View style={s.GooglePlacesAutocompleteContainer}>
          <GooglePlacesAutocomplete
            text={''}
            onPress={(data, details) => {
              this.handleSelectPlace(data, details);
            }}
          />
        </View>
        <Text style={s.title}>Date:</Text>
        <DatePicker
          style={s.datePicker}
          date={this.state.date}
          mode='date'
          format='DD / MM / YYYY'
          minDate={moment().format('DD / MM / YYYY')}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
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
  navigateBack: () => dispatch(navigateBack()),
  closeConfirmationAlertOpen: () => dispatch(closeCreateEventConfirmationAlert()),
  closeErrorAlertOpen: () => dispatch(closeCreateEventErrorAlert()),
  closeErrorAlertOpen: () => dispatch(closeCreateEventErrorAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);

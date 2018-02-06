import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, View, Text, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from '../../components/GooglePlacesAutocomplete';
import {
  editEvent,
  navigate,
  navigateBack,
  closeEditEventConfirmationAlert,
  closeEditEventErrorAlert
} from '../../actions';
import debounce from 'lodash.debounce';

const moment = require('moment');

import s from './styles';
import cs from './customStyles';

class EditEvent extends Component {
  constructor (props) {
    super(props);
    this.eventUpdate ={
      'place_id': this.props.events[this.props.eventId].place_id,
      'place_name': this.props.events[this.props.eventId].place_name,
      'place_address': this.props.events[this.props.eventId].place_address,
      'place_url': this.props.events[this.props.eventId].place_url,
      'location': this.props.events[this.props.eventId].location,
      'when': this.props.events[this.props.eventId].when,
    };
    this.state = {
      date: moment(this.eventUpdate.when).format('DD / MM / YYYY'),
      time: moment(this.eventUpdate.when).format('HH : mm'),
      editButtonDisabled: true,
      showActivityIndicator: false,
    };
  }

  componentWillMount() {
    this.handleEdit = debounce(this.handleEdit, 10);
  }

  confirmationAlert = () => {
    Alert.alert(
      'Congratulations!',
      'Your event has been modified',
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
    this.props.navigateBack();
  }

  onErrorAlertOk = () => {
    this.props.closeErrorAlertOpen();
  }

  handleEdit = () => {
    let date = this.state.date.split(' / ');
    let time = this.state.time.split(':');
    let newDateTime = new Date(date[2], parseInt(date[1], 10) - 1, date[0], time[0], time[1]);
    this.eventUpdate.when = newDateTime.getTime();
    // if ( restaurant input is not empty ) {
    this.props.editEvent(this.props.eventId, this.eventUpdate);
    this.setState({
      editButtonDisabled: true,
      showActivityIndicator: true
    });
    // }
  }

  handleSelectPlace = (data, details) => {
    this.eventUpdate = {
      'place_id': data.id,
      'place_name': data.name,
      'place_address': data.vicinity,
      'place_url': details.url,
      'location': {
        'type': 'Point',
        'coordinates': [data.geometry.location.lng, data.geometry.location.lat]
      }
    };
    this.setState({editButtonDisabled: false});
  }

  handleOnDateChange = (date) =>  {
    this.setState({date: date});
    this.setState({editButtonDisabled: false});
  }

  handleOnTimeChange = (time) =>  {
    this.setState({time: time});
    this.setState({editButtonDisabled: false});
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
          title='Edit'
          onPress={this.handleEdit}
          disabled={this.state.editButtonDisabled}
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
            text={this.eventUpdate.place_name}
            onPress={(data, details) => this.handleSelectPlace(data, details)}
          />
        </View>
        <Text style={s.title}>Date:</Text>
        <DatePicker
          style={s.datePicker}
          date={this.state.date}
          mode="date"
          format='DD / MM / YYYY'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={cs.datePicker}
          onDateChange={(date) => this.handleOnDateChange(date)}
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
          onDateChange={(time) => this.handleOnTimeChange(time)}
        />
        <View style={s.bottomContainer}>
          {this.renderBotom()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  confirmationAlertOpen: state.pages.EditEvent.confirmationAlertOpen,
  errorAlertOpen: state.pages.EditEvent.errorAlertOpen,
  events: state.entities.events,
  eventId: state.pages.EditEvent.eventId
});

const mapDispatchToProps = (dispatch) => ({
  editEvent: (eventId, data) => dispatch(editEvent(eventId,data)),
  navigate: (screen) => dispatch(navigate(screen)),
  navigateBack: () => dispatch(navigateBack()),
  closeConfirmationAlertOpen: () => dispatch(closeEditEventConfirmationAlert()),
  closeErrorAlertOpen: () => dispatch(closeEditEventErrorAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);


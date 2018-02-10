import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView,TouchableWithoutFeedback, TouchableOpacity, Image, Text, ActionSheetIOS, StyleSheet, Linking, Platform } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';
import s from './styles';
import _ from 'lodash';
import { navigate, goToUser, joinEvent, leaveEvent, deleteEvent, goToEditEvent } from '../../actions';

class EventDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      actionSheetOption: '',
      actionSheetCb: '',
      actionSheetEventId: '',
      actionSheetUserId: '',
    };
  }

  leaveEventAction(option, cb, eventId, userId) {
    if (Platform.OS === 'ios') {
      var BUTTONS = [
        option,
        'Cancel',
      ];
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: 1,
        tintColor: '#2ECC71'
      },
      (buttonIndex) => {
        switch (buttonIndex) {
        case 0:
          cb(eventId, userId);
          break;
        }
      });
    } else {
      this.setState({ 
        actionSheetOption: option,
        actionSheetCb: cb,
        actionSheetEventId: eventId,
        actionSheetUserId: userId,
      });
      this.actionSheet.show();
    }
  }

  handleActionSheetPress = (buttonIndex) => {
    switch (buttonIndex) {
    case 0:
      this.state.actionSheetCb(this.state.actionSheetEventId, this.state.actionSheetUserId);
      break;
    }
  }

  goToRestaurantAction(dest) {
    if (Platform.OS === 'ios') {
      var BUTTONS = [
        'Open Google Maps',
        'Open Maps',
        'Cancel',
      ];
      dest = dest.split(' ').join('+');
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: 2,
        tintColor: '#2ECC71'
      },
      (buttonIndex) => {
        switch (buttonIndex) {
        case 0:
          Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${dest}`).catch(err =>
            console.error('An error occurred', err)
          );
          break;
        case 1:
          Linking.openURL(`http://maps.apple.com/?daddr=${dest}&dirflg=w&t=r`).catch(err =>
            console.error('An error occurred', err)
          );
          break;

        }
      });
    } else {
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${dest}`).catch(err =>
        console.error('An error occurred', err)
      );
    }
  }

  getActionSheetRef = ref => (this.actionSheet = ref)

  goToEditEventAction = () => {
    this.props.goToEditEvent(this.props.eventData._id);
    this.props.navigate('EditEvent');
  }

  handleJoinEvent = () => {
    this.props.joinEvent(this.props.eventData._id, this.props.user._id);
  }

  renderOthers = () => {
    return (<View style={s.inner_actions}>
      {this.props.eventData.attendees.indexOf(this.props.user._id) !== -1 ?
        <TouchableWithoutFeedback onPress={()=>{
          this.leaveEventAction('Leave The Event', this.props.leaveEvent, this.props.eventData._id, this.props.user._id);
        }}>
          <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
            <Image source={require('../../assets/icons/event_joined.png')} style={s.inner_actions_icon}></Image>
            <Text style={s.inner_actions_text}>LEAVE EVENT</Text>
          </View>
        </TouchableWithoutFeedback> :
        <TouchableWithoutFeedback onPress={_.debounce(this.handleJoinEvent, 1000)}>
          <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
            <Image source={require('../../assets/icons/event_join.png')} style={s.inner_actions_icon}></Image>
            <Text style={s.inner_actions_text}>JOIN THEM</Text>
          </View>
        </TouchableWithoutFeedback>
      }
      <TouchableWithoutFeedback onPress={()=>{
        this.goToRestaurantAction(this.props.eventData.place_address);}}>
        <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
          <Image source={require('../../assets/icons/event_pin.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>GET THERE</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() =>
        Linking.openURL(this.props.eventData.place_url).catch(err =>
          console.error('An error occurred', err)
        )
      }>
        <View style={s.inner_actions_btn}>
          <Image source={require('../../assets/icons/event_restaurant.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>RESTAURANT</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>);
  }

  renderYour = () => {
    return (<View style={s.inner_actions}>
      {this.props.eventData.attendees.length === 1 ?
        <TouchableWithoutFeedback onPress={()=>{
          this.leaveEventAction('Delete The Event', this.props.deleteEvent, this.props.eventData._id, this.props.user._id);
        }}>
          <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
            <Image source={require('../../assets/icons/event_delete.png')} style={s.inner_actions_icon}></Image>
            <Text style={s.inner_actions_text}>DELETE EVENT</Text>
          </View>
        </TouchableWithoutFeedback> :
        <TouchableWithoutFeedback onPress={()=>{
          this.leaveEventAction('Leave The Event', this.props.leaveEvent, this.props.eventData._id, this.props.user._id);
        }}>
          <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
            <Image source={require('../../assets/icons/event_joined.png')} style={s.inner_actions_icon}></Image>
            <Text style={s.inner_actions_text}>LEAVE EVENT</Text>
          </View>
        </TouchableWithoutFeedback>
      }

      <TouchableWithoutFeedback onPress={()=>{
        this.goToRestaurantAction(this.props.eventData.place_address);}}>
        <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
          <Image source={require('../../assets/icons/event_pin.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>GET THERE</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={_.debounce(this.goToEditEventAction, 1000)}>
        <View style={s.inner_actions_btn}>
          <Image source={require('../../assets/icons/event_edit.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>EDIT EVENT</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>);
  }

  handleClickUser = (i) => {
    return () => {
      if (this.props.eventData.attendees[i] === this.props.user._id) this.props.navigate('Profile');
      else {
        this.props.goToUser(this.props.eventData.attendees[i]);
        this.props.navigate('User');
      }
    };

  }

  render() {
    return  (
      <View style={s.event_inner_detail}>
        {this.props.eventData.when < Date.now() ? null : this.props.user._id === this.props.eventData.creator ? this.renderYour() : this.renderOthers()}
        <View style={s.event_inner_participants}>
          <Text style={s.inner_actions_text}>Participants:</Text>
          <View style={s.inner_participants_people}>
            {_.range(4).map(i => {
              return this.props.eventData.attendees[i] ?
                <View  key={i} style={s.inner_participants_person}>
                  <TouchableWithoutFeedback onPress={_.debounce(this.handleClickUser(i), 1000)} >
                    <Image source={{uri: this.props.users[this.props.eventData.attendees[i]].profile_picture}} style={s.inner_participants_picture}></Image>
                  </TouchableWithoutFeedback>
                  <Text style={s.inner_actions_text}>{this.props.users[this.props.eventData.attendees[i]].name}</Text>
                </View>
                :
                <View  key={i}  style={s.inner_participants_person}>
                  <Image source={require('../../assets/icons/event_free.png')} style={s.inner_participants_picture}></Image>
                  <Text style={s.inner_actions_text}>Free</Text>
                </View>;
            })}
          </View>
        </View>
        <ActionSheet
          ref={this.getActionSheetRef}
          options={[{component: <Text style={{ color: '#2ECC71', fontSize: 22}}>{this.state.actionSheetOption}</Text>,height: 60}, 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={this.handleActionSheetPress}
          tintColor={'#2ECC71'}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users,
  user: state.authentication.user,
  events: state.entities.events
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (screen) => dispatch(navigate(screen)),
  goToUser: (userId) => dispatch(goToUser(userId)),
  joinEvent: (eventId, userId) => dispatch(joinEvent(eventId, userId)),
  leaveEvent: (eventId, userId) => dispatch(leaveEvent(eventId, userId)),
  deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  goToEditEvent: (eventId) => dispatch(goToEditEvent(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView,TouchableWithoutFeedback, Image, Text } from 'react-native';
import s from './styles';
import _ from 'lodash';
import { navigate, goToUser, joinEvent, leaveEvent } from '../../actions';


class EventDetail extends Component {
  constructor(props){
    super(props);
  }

  renderOthers = () => {
    return (<View style={s.inner_actions}>
        {this.props.eventData.attendees.indexOf(this.props.user._id) !== -1 ?
          <TouchableWithoutFeedback onPress={()=>{
            this.props.leaveEvent(this.props.eventData._id, this.props.user._id);}}>
          <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
            <Image source={require('../../assets/icons/event_joined.png')} style={s.inner_actions_icon}></Image>
            <Text style={s.inner_actions_text}>LEAVE EVENT</Text>
          </View>
        </TouchableWithoutFeedback> :
        <TouchableWithoutFeedback onPress={()=>{
            this.props.joinEvent(this.props.eventData._id, this.props.user._id);}}>
          <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
            <Image source={require('../../assets/icons/event_join.png')} style={s.inner_actions_icon}></Image>
            <Text style={s.inner_actions_text}>JOIN THEM</Text>
          </View>
        </TouchableWithoutFeedback>
        }
      <TouchableWithoutFeedback>
        <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
          <Image source={require('../../assets/icons/event_pin.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>GET THERE</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={s.inner_actions_btn}>
          <Image source={require('../../assets/icons/event_restaurant.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>RESTAURANT</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>)
  }

  renderYour = () => {
    return (<View style={s.inner_actions}>
      <TouchableWithoutFeedback
        onPress={()=>{ this.props.leaveEvent(this.props.eventData._id, this.props.user._id)}}
        >
        <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
          <Image source={require('../../assets/icons/event_joined.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>LEAVE EVENT</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
          <Image source={require('../../assets/icons/event_pin.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>GET THERE</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={s.inner_actions_btn}>
          <Image source={require('../../assets/icons/event_edit.png')} style={s.inner_actions_icon}></Image>
          <Text style={s.inner_actions_text}>EDIT EVENT</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>)
  }

  render() {
    return  (
      <View style={s.event_inner_detail}>
        {this.props.user._id === this.props.eventData.creator ? this.renderYour() : this.renderOthers()}
        <View style={s.event_inner_partecipants}>
          <Text style={s.inner_actions_text}>Partecipants:</Text>
          <View style={s.inner_partecipants_people}>
            {_.range(4).map(i => {
              return this.props.eventData.attendees[i] ?
                <View  key={i} style={s.inner_partecipants_person}>
                  <TouchableWithoutFeedback onPress={()=> {this.props.goToUser(this.props.eventData.attendees[i]); this.props.navigate('User');}} >
                    <Image source={{uri: this.props.users[this.props.eventData.attendees[i]].profile_picture}} style={s.inner_partecipants_picture}></Image>
                  </TouchableWithoutFeedback>
                  <Text style={s.inner_actions_text}>{this.props.users[this.props.eventData.attendees[i]].name}</Text>
                </View>
                :
                <View  key={i}  style={s.inner_partecipants_person}>
                  <Image source={require('../../assets/icons/event_free.png')} style={s.inner_partecipants_picture}></Image>
                  <Text style={s.inner_actions_text}>Free</Text>
                </View>;
            })}
          </View>
        </View>
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
  leaveEvent: (eventId, userId) => dispatch(leaveEvent(eventId, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView,TouchableWithoutFeedback, Image, Text } from 'react-native';
import s from './styles';
import _ from 'lodash';

class EventDetail extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return  (
      <View style={s.event_inner_detail}>
        <View style={s.inner_actions}>
          <TouchableWithoutFeedback>
            <View style={[s.inner_actions_btn, s.inner_actions_btn_separator]}>
              <Image source={require('../../assets/icons/event_join.png')} style={s.inner_actions_icon}></Image>
              <Text style={s.inner_actions_text}>JOIN THEM</Text>
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
              <Image source={require('../../assets/icons/event_restaurant.png')} style={s.inner_actions_icon}></Image>
              <Text style={s.inner_actions_text}>RESTAURANT</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={s.event_inner_partecipants}>
          <Text style={s.inner_actions_text}>Partecipants:</Text>
          <View style={s.inner_partecipants_people}>
            {_.range(4).map(i => {
              return this.props.eventData.attendees[i] ?
                <View key={i} style={s.inner_partecipants_person}>
                  <Image source={{uri: this.props.users[this.props.eventData.attendees[i]].profile_picture}} style={s.inner_partecipants_picture}></Image>
                  <Text style={s.inner_actions_text}>{this.props.users[this.props.eventData.attendees[i]].name}</Text>
                </View> :
                <View key={i} style={s.inner_partecipants_person}>
                  <Image source={require('../../assets/icons/event_free.png')} style={s.inner_partecipants_picture}></Image>
                  <Text style={s.inner_actions_text}>free</Text>
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
  user: state.authentication.user
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);

import React, { Component } from 'react';
import { View, ScrollView,TouchableWithoutFeedback, Image, Text } from 'react-native';
import s from './styles';

class EventDetail extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return  (
      <View style={s.event_inner_detail}>
        <View style={s.inner_actions}>
          <TouchableWithoutFeedback>
            <View style={s.inner_actions_btn}>
              <Image source={require('../../assets/icons/event_join.png')} style={s.inner_actions_icon}></Image>
              <Text style={s.inner_actions_text}>JOIN THEM</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={s.inner_actions_btn}>
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
            <View style={s.inner_partecipants_person}>
              <Image source={require('../../assets/icons/event_free.png')} style={s.inner_partecipants_picture}></Image>
              <Text style={s.inner_actions_text}>free</Text>
            </View>
            <View style={s.inner_partecipants_person}>
              <Image source={require('../../assets/icons/event_free.png')} style={s.inner_partecipants_picture}></Image>
              <Text style={s.inner_actions_text}>free</Text>
            </View>
            <View style={s.inner_partecipants_person}>
              <Image source={require('../../assets/icons/event_free.png')} style={s.inner_partecipants_picture}></Image>
              <Text style={s.inner_actions_text}>free</Text>
            </View>
            <View style={s.inner_partecipants_person}>
              <Image source={require('../../assets/icons/event_free.png')} style={s.inner_partecipants_picture}></Image>
              <Text style={s.inner_actions_text}>free</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default EventDetail;

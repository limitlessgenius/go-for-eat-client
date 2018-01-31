import React, { Component } from 'react';
import { View, ScrollView,TouchableWithoutFeedback, Image, Text } from 'react-native';
import s from './styles';
import { EventDetail } from '../EventDetail'
import moment from 'moment'
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDetails: false,
      height: 120,
    };
  }

  renderInnerEvent = () => {
  return(
    <EventDetail eventData={this.props.eventData}/>
  )};

  render() {
    return this.props.eventData !== undefined ?
      (
        <Animatable.View duration={500} transition='height' style={{height: this.state.height}}>
          <TouchableWithoutFeedback
            onPress={()=>{
              this.setState({
                height: !this.state.openDetails ? 370 : 120,
                openDetails: !this.state.openDetails,
              });
          }}>
            <View style={s.event}>
              <View style={s.event_detail}>
                <Text style={s.event_detail_eventName}> {this.props.users[this.props.eventData.creator].name}, {this.props.eventData.place_name} </Text>
                <Text style={s.event_detail_address}> {this.props.eventData.place_address}  </Text>
                <View style={s.event_detail_time}>
                  <Text style={s.event_detail_time_text}> {moment(this.props.eventData.when).format('HH:mm')} </Text>
                </View>
              </View>
              <View style={s.event_distance}>
                <Text style={s.event_distance_number}> {Math.round((this.props.eventData.distance/1000) * 100) / 100}</Text>
                <Text style={s.event_distance_text}> km </Text>
              </View>
              <View style={s.event_spots}>
                {_.range(4).map(i => {
                  return this.props.eventData.attendees[i] ?
                  <Image key={i} style={s.event_spots_full} source={require('../../assets/icons/event_spot.png')}/> :
                  <Image key={i} style={s.event_spots_free} source={require('../../assets/icons/event_spot.png')}/>
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
            {this.state.openDetails ?
              this.renderInnerEvent()
              : null}
          </View>
        </Animatable.View>
      ) :
      null;
    }
}


export default Event;

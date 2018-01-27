import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import s from './styles';

class Home extends Component {

  render() {
    return  (
      <View style={s.container}>
        <View style={s.map}>
          <Text style={s.map_text}> MAPPA </Text>
        </View>
        <ScrollView style={s.list}>
          <View style={s.list_dragBar}>
            <View style={s.list_dragBar_line}></View>
          </View>
          <View style={s.event}>
            <View style={s.event_detail}>
              <Text style={s.event_detail_eventName}> Nome, Location Restaurant </Text>
              <Text style={s.event_detail_address}> Carrer Sant Martì 13, Barcelona </Text>
              <View style={s.event_detail_time}>
                <Text style={s.event_detail_time_text}> 23:45 </Text>
              </View>
            </View>
            <View style={s.event_distance}>
              <Text style={s.event_distance_number}> 203 </Text>
              <Text style={s.event_distance_text}> m </Text>
            </View>
            <View style={s.event_spots}>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_free}></View>
              <View style={s.event_spots_free}></View>
            </View>
          </View>
          <View style={s.event}>
            <View style={s.event_detail}>
              <Text style={s.event_detail_eventName}> Nome, Location Restaurant </Text>
              <Text style={s.event_detail_address}> Carrer Sant Martì 13, Barcelona </Text>
              <View style={s.event_detail_time}>
                <Text style={s.event_detail_time_text}> 23:45 </Text>
              </View>
            </View>
            <View style={s.event_distance}>
              <Text style={s.event_distance_number}> 203 </Text>
              <Text style={s.event_distance_text}> m </Text>
            </View>
            <View style={s.event_spots}>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_free}></View>
              <View style={s.event_spots_free}></View>
            </View>
          </View>
          <View style={s.event}>
            <View style={s.event_detail}>
              <Text style={s.event_detail_eventName}> Nome, Location Restaurant </Text>
              <Text style={s.event_detail_address}> Carrer Sant Martì 13, Barcelona </Text>
              <View style={s.event_detail_time}>
                <Text style={s.event_detail_time_text}> 23:45 </Text>
              </View>
            </View>
            <View style={s.event_distance}>
              <Text style={s.event_distance_number}> 203 </Text>
              <Text style={s.event_distance_text}> m </Text>
            </View>
            <View style={s.event_spots}>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_free}></View>
              <View style={s.event_spots_free}></View>
            </View>
          </View>
          <View style={s.event}>
            <View style={s.event_detail}>
              <Text style={s.event_detail_eventName}> Nome, Location Restaurant </Text>
              <Text style={s.event_detail_address}> Carrer Sant Martì 13, Barcelona </Text>
              <View style={s.event_detail_time}>
                <Text style={s.event_detail_time_text}> 23:45 </Text>
              </View>
            </View>
            <View style={s.event_distance}>
              <Text style={s.event_distance_number}> 203 </Text>
              <Text style={s.event_distance_text}> m </Text>
            </View>
            <View style={s.event_spots}>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_full}></View>
              <View style={s.event_spots_free}></View>
              <View style={s.event_spots_free}></View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import s from './styles';
import { Event } from '../../components/Event';
import _ from 'lodash';


class Home extends Component {
  constructor(props){
    super(props);
  }
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
          {  _.range(5).map((el) => {
            return  <Event key={el} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Home;

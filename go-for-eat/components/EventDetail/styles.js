//EVENT DETAIL COMPONENT
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  event_inner_detail:{
    width: '100%',
    height: '100%',
    backgroundColor: '#2ECC71',
    padding:10,
  },
  inner_actions:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
  inner_actions_btn:{
    height: 80,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inner_actions_btn_separator:{
    borderRightColor:'#2DAA5F',
    borderRightWidth:2,
  },
  inner_actions_icon:{
    transform: [
      { scale: 0.8},
    ],
  },
  inner_actions_text:{
    color: 'white',
  },
  inner_partecipants_people:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inner_partecipants_person:{
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inner_partecipants_picture:{
    width: 95,
    height: 95,
    transform: [
      { scale: 0.7},
    ],
    borderRadius: 47,
    borderColor: 'white',
    borderWidth: 5,
  }
});

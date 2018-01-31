//EVENT COMPONENT
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  event:{
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  event_detail_eventName:{
    fontFamily: 'Roboto',
    fontSize: 21,
    marginTop: 8,
    marginBottom: 8,
  },
  event_detail_address:{
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#2ECC71',
    marginBottom: 8,
  },
  event_detail_time:{
    backgroundColor: '#2ECC71',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    padding: 5,
    marginLeft: 5,
  },
  event_detail_time_text:{
    fontSize: 16,
    color: 'white',
  },
  event_distance:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  event_distance_number:{
    fontFamily: 'Roboto',
    fontSize: 32,
    marginBottom: 0,
  },
  event_distance_text:{
    fontFamily: 'Roboto',
    fontSize: 20,
    marginBottom: 8,
  },
  event_spots:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 10,
    marginLeft: 10,
    bottom: 20,
    paddingLeft: 140,
    paddingRight: 140,
  },
  event_spots_full:{
    transform: [
      { scale: 0.8},
    ],
  },
  event_spots_free:{
    transform: [
      { scale: 0.8},
    ],
    opacity: 0.3,
  },
});

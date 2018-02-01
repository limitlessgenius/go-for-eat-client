//EVENTLIST COMPONENT
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  list:{
    height: 100,
    width: '100%',
    backgroundColor: '#2ECC71',
    shadowColor: '#444',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  section_header:{
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#2DAA5F',
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  section_header_text:{
    color: 'white',
    fontFamily: 'Roboto_Medium',
    fontSize: 15,
    paddingLeft: 5,
  }
});

//EVENTLIST COMPONENT
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  list:{
    borderTopColor: '#2ECC71',
    borderTopWidth: 3,
    flex: 10,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#444',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  list_dragBar:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  list_dragBar_line:{
    backgroundColor: '#2ECC71',
    borderRadius: 4,
    width: 50,
    height: 5,
    margin: 10,
    opacity: 0.9,
  },
});

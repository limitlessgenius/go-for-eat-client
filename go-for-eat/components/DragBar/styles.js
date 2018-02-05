//DRAGBAR COMPONENT
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dragBar:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2DAA5F',
    height: 40,
  },
  dragBar_line:{
    backgroundColor: 'white',
    borderRadius: 4,
    width: 50,
    height: 3.5,
    marginBottom: 0,
    opacity: 0.9,
  },
  dragBar_message:{
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragBar_text:{
    color: '#2ECC71',
    fontSize: 15,
    fontFamily: 'Roboto_Medium',
  },
});

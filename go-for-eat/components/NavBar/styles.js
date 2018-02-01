import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navbar_container: {
    backgroundColor:'#2ECC71',
    paddingTop:50,
    borderBottomWidth:0,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  navbar_logo: {
    marginBottom:-30,
    transform: [{
      scale:0.45
    }],
  },
  navbar_title: {
    color:'white',
    fontFamily:'Roboto',
    fontSize:20
  },
  navbar_icon: {
    marginBottom:-13,
    transform: [
      {scale:0.65}
    ],
  }
});

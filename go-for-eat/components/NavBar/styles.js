import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navbar_container: {
    backgroundColor:'#2ECC71',
    paddingTop:50,
    borderBottomWidth:0
  },
  navbar_logo: {
    marginBottom:-25,
    transform: [{
      scale:0.5
    }]
  },
  navbar_title: {
    color:'white',
    fontFamily:'Roboto',
    fontSize:20
  },
  navbar_icon: {
    marginBottom:-10,
    transform: [
      {scale:0.7}
    ]
  }
});
